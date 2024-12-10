import React, { useMemo, useRef, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { cn } from '@utils/cn';
import { Expand } from './Icons';

const DEFAULT_EDITOR_HEIGHT = 40; //vh
const COLLAPSED_EDITOR_HEIGHT = 226; //px

interface FileEditorProps {
  fileContent: string | undefined;
  onValidation?: (valid: boolean) => void;
  fileType: 'json' | 'env';
  className?: string;
  variant?: 'narrow';
  onChange: (value: string | undefined) => void;
  expandedButtonLabel?: string;
  collapsedButtonLabel?: string;
}

const FileEditor: React.FC<FileEditorProps> = ({
  fileContent,
  onValidation,
  fileType,
  className,
  variant,
  onChange,
  expandedButtonLabel = 'Collapse',
  collapsedButtonLabel = 'Expand',
}) => {
  const editorRef = useRef<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const editorHeight = useMemo(() => {
    if (variant === 'narrow') {
      const currentContentHeight =
        editorRef?.current?.getContentHeight &&
        `${editorRef?.current?.getContentHeight() + 10}px`;

      return !isExpanded
        ? COLLAPSED_EDITOR_HEIGHT
        : (currentContentHeight ?? `${DEFAULT_EDITOR_HEIGHT}vh`);
    }

    return `${DEFAULT_EDITOR_HEIGHT}vh`;
  }, [isExpanded, variant]);

  const handleEditorWillMount = (monaco: Monaco) => {
    registerFleekTheme(monaco);
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    const updateContentHeight = () => {
      if (editorRef.current) {
        const height = editorRef.current.getContentHeight();
        setContentHeight(height);
      }
    };

    updateContentHeight();

    editor.onDidChangeModelContent(() => {
      updateContentHeight();
    });

    if (fileType === 'env') {
      registerEnvLanguage(monaco, editor);
    }

    const model = editor.getModel();
    if (model) {
      editor
        .getAction('editor.action.formatDocument')
        .run()
        .then(() => {
          const markers = monaco.editor.getModelMarkers({
            resource: model.uri,
          });
          handleValidation(markers);
        })
        .catch((error: any) => {
          console.error('Error formatting document on mount:', error);
        });
    }
  };

  const handleValidation = (markers: any[]) => {
    const hasErrors = markers.some((marker) => marker.severity === 8);
    onValidation?.(!hasErrors);
  };

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col gap-[20px] overflow-hidden rounded-[12px] border-1 border-[#343434]',
        className,
      )}
    >
      <Editor
        theme="customFleekTheme"
        height={editorHeight}
        width="100%"
        defaultLanguage={fileType}
        value={fileContent}
        onChange={onChange}
        onValidate={handleValidation}
        options={{
          minimap: { enabled: false },
          formatOnType: true,
          formatOnPaste: true,
          tabSize: 2,
          lineNumbersMinChars: 4,
          folding: false,
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: variant === 'narrow' && isExpanded ? 'hidden' : undefined,
            handleMouseWheel: variant === 'narrow' && isExpanded ? false : true,
          },
        }}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
      />

      {variant === 'narrow' && contentHeight > COLLAPSED_EDITOR_HEIGHT && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="absolute bottom-[18px] right-[18px] flex h-[24px] flex-row items-center gap-[4px]  rounded-[8px]  bg-[#222222] px-[8px] text-[12px] leading-[16px] text-[#b4b4b4] hover:bg-[#282828] hover:text-[#e2e2e2]"
        >
          <Expand />
          <span className="pt-4">
            {isExpanded ? expandedButtonLabel : collapsedButtonLabel}
          </span>
        </button>
      )}
    </div>
  );
};

const registerFleekTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('customFleekTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'variable', foreground: '9CDCFE' },
      { token: 'string.key.json', foreground: '3DD68C' },
      { token: 'string.value.json', foreground: 'EEEEEE' },
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#D4D4D4',
      'editorCursor.foreground': '#A7A7A7',
      'editorGutter.background': '#111111',
      'editorLineNumber.foreground': '#606060',
      'editor.minimap.border': '#00000000', // Fully transparent color to disable the border
    },
  });
};

const registerEnvLanguage = (monaco: Monaco, editor: Monaco) => {
  monaco.languages.register({ id: 'env' });

  monaco.languages.setMonarchTokensProvider('env', {
    tokenizer: {
      root: [
        [/^\s*#.*$/, 'comment'],
        [/^\s*[A-Z_]+\s*=\s*.*$/, 'variable'],
      ],
    },
  });

  monaco.languages.registerDocumentFormattingEditProvider('env', {
    provideDocumentFormattingEdits: (model) => {
      const formatted = model
        .getValue()
        .split('\n')
        .map((line) => {
          const [key, value] = line.split('=');
          return key && value ? `${key.trim()}=${value.trim()}` : line;
        })
        .join('\n');
      return [{ range: model.getFullModelRange(), text: formatted }];
    },
  });

  monaco.languages.registerCodeActionProvider('env', {
    provideCodeActions: (model, range, context, token) => {
      const markers: any[] = [];
      const lines = model.getValue().split('\n');
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (
          trimmedLine &&
          !trimmedLine.startsWith('#') &&
          !trimmedLine.includes('=')
        ) {
          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: 'Missing "=" in key-value pair',
            startLineNumber: index + 1,
            startColumn: 1,
            endLineNumber: index + 1,
            endColumn: line.length + 1,
          });
        }
      });
      monaco.editor.setModelMarkers(model, 'env', markers);

      const codeActions = markers.map((marker) => ({
        title: marker.message,
        diagnostics: [marker],
        edit: {
          edits: [],
        },
        kind: 'quickfix',
      }));

      return {
        actions: codeActions,
        dispose: () => {},
      };
    },
  });
};

export default FileEditor;

import React, { useMemo, useRef, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { cn } from '@utils/cn';
import { Expand } from './Icons';

interface Marker {
  severity: number;
  message: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

interface CodeAction {
  title: string;
  diagnostics: Marker[];
  edit: {
    edits: any[];
  };
  kind: string;
}

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
      return isExpanded ? `${contentHeight}px` : `${COLLAPSED_EDITOR_HEIGHT}px`;
    }
    return `${DEFAULT_EDITOR_HEIGHT}vh`;
  }, [isExpanded, variant, contentHeight]);

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

    const contentSizeChangeSubscription = editor.onDidContentSizeChange(() => {
      updateContentHeight();
    });

    if (fileType === 'env') {
      registerEnvLanguage(monaco);
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

    return () => {
      contentSizeChangeSubscription.dispose();
    };
  };

  const handleValidation = (markers: Marker[]) => {
    const MarkerSeverityError = 8;
    const hasErrors = markers.some(
      (marker) => marker.severity === MarkerSeverityError,
    );
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
          className="absolute bottom-[18px] right-[18px] flex h-[24px] flex-row items-center gap-[4px] rounded-[8px] bg-[#222222] px-[8px] text-[12px] leading-[16px] text-[#b4b4b4] hover:bg-[#282828] hover:text-[#e2e2e2]"
          aria-label={isExpanded ? 'Collapse editor' : 'Expand editor'}
        >
          <Expand />

          {isExpanded ? expandedButtonLabel : collapsedButtonLabel}
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

const registerEnvLanguage = (monaco: Monaco) => {
  monaco.languages.register({ id: 'env' });

  monaco.languages.setMonarchTokensProvider('env', {
    tokenizer: {
      root: [
        [/^\s*#.*$/, 'comment'],
        [/^\s*[A-Za-z_][A-Za-z0-9_]*\s*=\s*.*$/, 'key.value.env'],
        [/[A-Za-z_][A-Za-z0-9_]*/, 'variable.env'],
        [/=/, 'operator.env'],
        [/.*/, 'invalid.env'],
      ],
    },
  });

  monaco.languages.registerDocumentFormattingEditProvider('env', {
    provideDocumentFormattingEdits: (model) => {
      const formatted = model
        .getValue()
        .split('\n')
        .map((line) => {
          const match = line.match(/^(\s*[A-Za-z_][A-Za-z0-9_]*\s*)=(\s*.*)$/);
          return match ? `${match[1].trim()}=${match[2].trim()}` : line;
        })
        .join('\n');
      return [{ range: model.getFullModelRange(), text: formatted }];
    },
  });

  monaco.languages.registerCodeActionProvider('env', {
    provideCodeActions: (model, range, context, token) => {
      const markers: Marker[] = [];
      const codeActions: CodeAction[] = [];
      const lines = model.getValue().split('\n');

      const meaningfulLines = lines.filter(
        (line) => line.trim() && !line.trim().startsWith('#'),
      );

      if (meaningfulLines.length === 0) {
        return { actions: codeActions, dispose: () => {} };
      }

      meaningfulLines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (
          trimmedLine &&
          !trimmedLine.startsWith('#') &&
          !trimmedLine.includes('=')
        ) {
          const lineLength = line.length;
          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: 'Missing "=" in key-value pair',
            startLineNumber: index + 1,
            startColumn: 1,
            endLineNumber: index + 1,
            endColumn: lineLength + 1,
          });

          codeActions.push({
            title: 'Insert "="',
            diagnostics: [
              {
                ...markers[markers.length - 1],
              },
            ],
            edit: {
              edits: [
                {
                  resource: model.uri,
                  edits: [
                    {
                      range: new monaco.Range(
                        index + 1,
                        lineLength + 1,
                        index + 1,
                        lineLength + 1,
                      ),
                      text: '=',
                    },
                  ],
                },
              ],
            },
            kind: 'quickfix',
          });
        }
      });

      monaco.editor.setModelMarkers(model, 'env', markers);

      return {
        actions: codeActions,
        dispose: () => {},
      };
    },
  });
};

export default FileEditor;

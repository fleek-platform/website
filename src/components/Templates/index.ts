import { Header } from './TemplatesList/Header';
import { List } from './TemplatesList/List';
import { TemplateHero } from './TemplateDetails/TemplateHero';
import {
  TemplateReadme,
  TemplateNoReadme,
  TemplateReadmeError,
} from './TemplateDetails/TemplateReadme';
import { TemplateSpecs } from './TemplateDetails/TemplateSpecs';
import { TemplateScreenshot } from './TemplateDetails/TemplateScreenshot';
import { SimilarTemplates } from './TemplateDetails/SimilarTemplates';
import { TopActions } from './TemplateDetails/TopActions';

export default {
  Header,
  List,
  TemplateDetails: {
    TopActions,
    TemplateHero,
    TemplateReadme,
    TemplateNoReadme,
    TemplateReadmeError,
    TemplateSpecs,
    TemplateScreenshot,
    SimilarTemplates,
  },
};

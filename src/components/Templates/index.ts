import Header from './Header';
import Cards from './Cards';
import { TopActions } from './TemplateDetails/TopActions';
import { TemplateHero } from './TemplateDetails/TemplateHero';
import { TemplateReadme } from './TemplateDetails/TemplateReadme';
import { TemplateSpecs } from './TemplateDetails/TemplateSpecs';
import { TemplateScreenshot } from './TemplateDetails/TemplateScreenshot';
import { SimilarTemplates } from './TemplateDetails/SimilarTemplates';

export default {
  Header,
  Cards,
  TemplateDetails: {
    TopActions,
    TemplateHero,
    TemplateReadme,
    TemplateSpecs,
    TemplateScreenshot,
    SimilarTemplates,
  },
};

export type { Template } from './types';

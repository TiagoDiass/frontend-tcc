export type APIHelpCase = {
  id: string;
  title: string;
  description: string;
  pictures: string[];
  poolMoneyUrl: string | undefined;
};

export type HelpCase = APIHelpCase;

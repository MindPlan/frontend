export interface NotFoundDataTypes {
  title: string;
  subtitle: string;
  subtitleExpl: string;
  tryText: string;
  instructions: Array<{ text: string; link?: string }>;
}

export const NotFoundData: NotFoundDataTypes = {
  title: '404',
  subtitle: "Oops! Looks like you're lost.",
  subtitleExpl: 'The page you’re looking for doesn’t exist or has been moved.',
  tryText: 'Try this:',
  instructions: [
    { text: 'Check the URL' },
    { text: 'Use the search bar' },
    { text: 'Go back to the ', link: 'Homepage' },
  ],
};

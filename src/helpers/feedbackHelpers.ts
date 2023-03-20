export const saveFeedback = async (comment: string) => {
  const formId = process.env.REACT_APP_MESSENGER_API_FORM_ID;
  const apiKey = process.env.REACT_APP_MESSENGER_API_KEY;
  const url = process.env.REACT_APP_MESSENGER_API_URL;

  if (!formId || !apiKey || !url) {
    throw new Error('Invalid messenger config');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formId,
      data: {
        comment,
      },
    }),
  });

  if (!res.ok) {
    throw new Error('Error saving form response');
  }
};

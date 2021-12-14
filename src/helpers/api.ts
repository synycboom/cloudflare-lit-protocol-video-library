export const getBadRequestMessage = (err: any) => {
  if ('response' in err) {
    if (err.response.status === 400) {
      return err.response.data.error || '';
    }
  }

  return '';
};

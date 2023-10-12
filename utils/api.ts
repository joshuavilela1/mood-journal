//* window.location.origin = 'http://localhost:3000' or whichever link you are on
//* path would be where you want it to be like /api/journal etc
const createURL = (path: string) => {
  return window.location.origin + path;
};

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
      //? body: JSON.stringify({}), in case you need to send a body (stringify)
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

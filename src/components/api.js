const APIURL = 'https://app.akira.md/api/system_status';

export async function getStatus() {
  return fetch(APIURL)
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json()
            .then(data => {
            let err = {errorMessage: data.message};
            throw err;
            });
        } else {
          let err = {errorMessage: 'Server is not responding'};
          throw err;
        }
      }
    return resp.json();
  });
}
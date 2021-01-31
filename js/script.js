// Get DOM Objects & Event Listeners
const btnGet = document.getElementById('get');
const btnAdd = document.getElementById('post');
const btnUpdate = document.getElementById('patch');
const btnDelete = document.getElementById('delete');
const btnSim = document.getElementById('sim');
const btnHeaders = document.getElementById('headers');
const btnTransform = document.getElementById('transform');
const btnError = document.getElementById('error');
const btnCancel = document.getElementById('cancel');
const showResponse = document.getElementById('response');

btnGet.addEventListener('click', getTodos);
btnAdd.addEventListener('click', addTodos);
btnUpdate.addEventListener('click', updateTodos);
btnDelete.addEventListener('click', deleteTodos);
btnSim.addEventListener('click', getData);
btnHeaders.addEventListener('click', customHeaders);
btnTransform.addEventListener('click', transformResponse);
btnError.addEventListener('click', errorHandling);
btnCancel.addEventListener('click', cancelToken);

// AXIOS GET Request Function
function getTodos() {
   axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS POST Request Function
function addTodos() {
   axios
      .post('https://jsonplaceholder.typicode.com/todos', {
         title: 'This is New Todo',
         completed: false,
      })
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS PATCH Request Function
function updateTodos() {
   axios
      .patch('https://jsonplaceholder.typicode.com/todos/1', {
         title: 'This is Updated Todo',
         completed: true,
      })
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS DELETE Request Function
function deleteTodos() {
   axios
      .delete('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS Simultaneous Data Function
function getData() {
   axios
      .all([
         axios.get('https://jsonplaceholder.typicode.com/todos'),
         axios.get('https://jsonplaceholder.typicode.com/posts'),
      ])
      .then(axios.spread((todos, posts) => showOutput(posts)))
      .catch((error) => console.error(error));
}

// AXIOS Custom Headers Function
function customHeaders() {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Some Token Number',
      },
   };

   axios
      .post(
         'https://jsonplaceholder.typicode.com/todos',
         {
            title: 'This is New Todo',
            completed: false,
         },
         config,
      )
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS Transforming Request Function
function transformResponse() {
   const options = {
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
         title: 'This Another New Todo',
         completed: false,
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
         data.title = data.title.toUpperCase();
         return data;
      }),
   };

   axios(options)
      .then((response) => showOutput(response))
      .catch((error) => console.error(error));
}

// AXIOS Error Handling Function
function errorHandling() {
   axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => showOutput(response))
      .catch((error) => {
         if (error.response) {
            // Server Responded with Status
            console.log(error.response.headers);
            console.log(error.response.data);
            console.log(error.response.status);
         } else if (error.request) {
            // Request was Made But No Response
            console.error(error.request);
         } else {
            console.error(error.message);
         }
      });
}

// AXIOS Cancel Token Function
function cancelToken() {
   const source = axios.CancelToken.source();

   axios
      .get('https://jsonplaceholder.typicode.com/todos', {
         cancelToken: source.token,
      })
      .then((response) => showOutput(response))
      .catch((thrown) => {
         if (axios.isCancel(thrown)) {
            console.log('Request Canceled', thrown.message);
         }
      });

   if (true) {
      source.cancel('Request Canceled!');
   }
}

// Show Output on Browser
function showOutput(response) {
   showResponse.innerHTML = `
      <div class="card">
         <h3 class="title title-medium">Status</h3>
         <pre>${response.status}</pre>
      </div>
      <div class="card">
         <h3 class="title title-medium">Headers</h3>
         <pre>${JSON.stringify(response.headers, null, 2)}</pre>
      </div>
      <div class="card">
         <h3 class="title title-medium">Data</h3>
         <pre>${JSON.stringify(response.data, null, 2)}</pre>
      </div>
      <div class="card">
         <h3 class="title title-medium">Config</h3>
         <pre>${JSON.stringify(response.config, null, 2)}</pre>
      </div>
   `;
}

// AXIOS Globals Commons
axios.defaults.headers.common['X-Auth-Token'] =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV';

// AXIOS Intercepting Requests & Responses
axios.interceptors.request.use(
   (config) => {
      const getFullDate = new Date();
      getFullDate.setSeconds(getFullDate.getSeconds());

      console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${getFullDate}`);

      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

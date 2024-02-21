const apiUrl = 'http://localhost:3001/user';

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json();
}

const formularioUsuario = document.getElementById('formularioUsuario');

formularioUsuario.addEventListener('submit', function (event) {
  event.preventDefault();

  const dadosUsuario = {
    username: document.getElementById('username').value,
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    avatar: document.getElementById('avatar').value,
    email: document.getElementById('email').value,
  };

  // Verifica se é uma requisição POST ou PUT com base na existência do ID
  const method = dadosUsuario.id ? 'PUT' : 'POST';
  const url = dadosUsuario.id ? `${apiUrl}/${dadosUsuario.id}` : apiUrl;

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  })
    .then(handleResponse)
    .then(data => {
      console.log('Operação bem-sucedida:', data);
      // Redireciona de volta para a página principal após a conclusão da operação
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
});
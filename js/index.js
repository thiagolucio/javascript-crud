const apiUrl = 'http://localhost:3001/user';

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json();
}

function listarUsuarios() {
  fetch(apiUrl)
    .then(handleResponse)
    .then(data => {
      const tabelaUsuarios = document.getElementById('tabelaUsuarios');
      const tbody = tabelaUsuarios.querySelector('tbody');
      tbody.innerHTML = '';

      data.forEach(usuario => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = usuario.id;
        row.appendChild(idCell);

        const avatarCell = document.createElement('td');
        avatarCell.innerHTML = `<div class="avatar_content"><img src="${usuario.avatar}" alt="Avatar" class="avatar" /></div>`;
        row.appendChild(avatarCell);

        const nomeCompleto = `${usuario.first_name} ${usuario.last_name}`;
        const nomeCell = document.createElement('td');
        nomeCell.textContent = nomeCompleto;
        row.appendChild(nomeCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = usuario.username;
        row.appendChild(usernameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = usuario.email;
        row.appendChild(emailCell);

        const acoesCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'rounded-3');
        // deleteButton.textContent = 'Excluir';
        deleteButton.innerHTML = '<img src="/img/trash.svg" alt="Excluír" class="icon" title="Excluir" />';
        deleteButton.addEventListener('click', () => excluirUsuario(usuario.id));

        acoesCell.appendChild(deleteButton);
        row.appendChild(acoesCell);

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
}

function excluirUsuario(idUsuario) {
  fetch(`${apiUrl}/${idUsuario}`, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .then(data => {
      console.log('Usuário excluído:', data);
      listarUsuarios(); // Atualiza a lista após a exclusão
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
}

// Inicializa a lista de usuários ao carregar a página
listarUsuarios();

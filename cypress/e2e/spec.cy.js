describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Testa botão marcar todos como feito' , () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Comprar pão{enter}')
      .type('Estudar Cypress{enter}')
      .type('Fazer exercícios{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    cy.get('.toggle-all-label')
      .click();

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

    cy.get('.toggle-all-label')
      .click();

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
  });

it('Testa botão clear completed', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('.toggle-all-label')
    .click();
    

    cy.get('.clear-completed').
    click();

    cy.get('[data-cy=todo-input]')
      .type('Comprar pão{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

  });

  it('Cria e edita uma tarefa', ()=>{
    cy.visit('');

    const tarefaOriginal = 'Comprar leite';
    const tarefaEditada = 'Comprar café';

    cy.get('[data-cy=todo-input]')
      .type(`${tarefaOriginal}{enter}`);

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', tarefaOriginal);

    cy.get('[data-cy=todos-list] li label')
      .first()
      .dblclick();

    cy.get('.edit')
      .should('have.value', tarefaOriginal)
      .clear()
      .type(`${tarefaEditada}{enter}`);

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', tarefaEditada);
  });

});
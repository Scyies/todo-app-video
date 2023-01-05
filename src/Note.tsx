import { Trash } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { v4 } from 'uuid';

interface ITodo {
  descricao: string;
  completo: boolean;
  id: string;
}

function App() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [descricao, setDescricao] = useState<string>('');
  const [filtros, setFiltros] = useState<'todos' | 'paraFazer' | 'completos'>(
    'todos'
  );

  function completarTodo(id: string) {
    setTodo((prev) => {
      const novoValor = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completo: !todo.completo };
        }
        return todo;
      });
      return novoValor;
    });
  }

  function adicionarTodo(evento: FormEvent) {
    evento.preventDefault();

    if (!descricao) return alert('Favor preencher a descrição!');

    setTodo((prev) => [
      ...prev,
      {
        descricao: descricao,
        completo: false,
        id: v4(),
      },
    ]);
    setDescricao('');
  }

  function filtraTodos(filtro: string) {
    if (filtro === 'todos') return todo;
    if (filtro === 'paraFazer')
      return todo.filter((todo) => todo.completo === false);
    if (filtro === 'completos')
      return todo.filter((todo) => todo.completo === true);
  }

  function deletarTodo(id: string) {
    setTodo((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <header>My Todo List</header>
      <main className='container'>
        <nav>
          <li
            onClick={() => setFiltros('todos')}
            className={`${filtros === 'todos' ? 'filtroAtivo' : ''}`}
          >
            Todos
          </li>
          <li
            onClick={() => setFiltros('paraFazer')}
            className={`${filtros === 'paraFazer' ? 'filtroAtivo' : ''}`}
          >
            Para fazer
          </li>
          <li
            onClick={() => setFiltros('completos')}
            className={`${filtros === 'completos' ? 'filtroAtivo' : ''}`}
          >
            Completos
          </li>
        </nav>
        <form onSubmit={adicionarTodo}>
          <input
            type='text'
            placeholder='Adicionar detalhes'
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <button type='submit'>Adicionar</button>
        </form>
        <section className='todos-container'>
          {todo &&
            filtraTodos(filtros)?.map(({ id, descricao, completo }) => (
              <div key={id} className='todo-container'>
                <div className='todo'>
                  <input
                    type='checkbox'
                    id={id}
                    checked={completo}
                    onChange={() => completarTodo(id)}
                  />
                  <label htmlFor={id}>{descricao}</label>
                </div>
                {filtros === 'completos' && (
                  <span onClick={() => deletarTodo(id)}>
                    <Trash size={24} weight='bold' />
                  </span>
                )}
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}

export default App;

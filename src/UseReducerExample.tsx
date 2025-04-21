import React, { useReducer } from 'react';

interface State {
  count: number;
}

interface Action {
  type: 'increment' | 'decrement';
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const CounterWithReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
        onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <span>{state.count}</span>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r" onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
};

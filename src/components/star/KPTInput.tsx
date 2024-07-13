import React from 'react';

interface KPTInputProps {
  keep: string[];
  problem: string[];
  tTry: string[];
  onChange: (keep: string[], problem: string[], tTry: string[]) => void;
}

const KPTInput = ({
  keep,
  problem,
  tTry: tTryItems,
  onChange,
}: KPTInputProps) => {
  const handleAdd = (type: 'keep' | 'problem' | 'tTry') => {
    if (type === 'keep') onChange([...keep, ''], problem, tTryItems);
    if (type === 'problem') onChange(keep, [...problem, ''], tTryItems);
    if (type === 'tTry') onChange(keep, problem, [...tTryItems, '']);
  };

  const handleChange = (
    type: 'keep' | 'problem' | 'tTry',
    index: number,
    newValue: string
  ) => {
    if (type === 'keep') {
      const newKeep = keep.slice();
      newKeep[index] = newValue;
      onChange(newKeep, problem, tTryItems);
    }
    if (type === 'problem') {
      const newProblem = problem.slice();
      newProblem[index] = newValue;
      onChange(keep, newProblem, tTryItems);
    }
    if (type === 'tTry') {
      const newtTry = tTryItems.slice();
      newtTry[index] = newValue;
      onChange(keep, problem, newtTry);
    }
  };

  return (
    <div>
      <label>KPT 입력:</label>
      <div>
        <h3>Keep</h3>
        {keep.map((k, index) => (
          <input
            key={index}
            type="text"
            value={k}
            onChange={(e) => handleChange('keep', index, e.target.value)}
          />
        ))}
        <button onClick={() => handleAdd('keep')}>추가</button>
      </div>
      <div>
        <h3>Problem</h3>
        {problem.map((p, index) => (
          <input
            key={index}
            type="text"
            value={p}
            onChange={(e) => handleChange('problem', index, e.target.value)}
          />
        ))}
        <button onClick={() => handleAdd('problem')}>추가</button>
      </div>
      <div>
        <h3>tTry</h3>
        {tTryItems.map((t, index) => (
          <input
            key={index}
            type="text"
            value={t}
            onChange={(e) => handleChange('tTry', index, e.target.value)}
          />
        ))}
        <button onClick={() => handleAdd('tTry')}>추가</button>
      </div>
    </div>
  );
};

export default KPTInput;

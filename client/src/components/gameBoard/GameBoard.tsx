import React, { useEffect } from 'react';

export const GameBoard = () => {
  const [gameArr, setGameArr] = React.useState<any>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://localhost:3001/game/questions', {
          credentials: 'include',
        });
        const result = await response.json();
        setGameArr(result.gameArr);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {gameArr &&
        gameArr.map((el) => (
          <div key={el.id}>
            <div>{el.title}</div>
            <div>
              {el &&
                el.questions.map((el2) => <div key={el2.id}>{el2.score}</div>)}
            </div>
          </div>
        ))}

      <div className="flex justify-center">
        <div className="px-5">
          <div className="bg-emerald-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg">
            Topic1
          </div>
          <div className="bg-emerald-400 mt-2 border-solid border-2 border-black text-center h-10 w-32 rounded-lg">
            Topic2
          </div>
          <div className="bg-emerald-400 mt-2 border-solid border-2 border-black text-center h-10 w-32 rounded-lg">
            Topic3
          </div>
          <div className="bg-emerald-400 mt-2 border-solid border-2 border-black text-center h-10 w-32 rounded-lg">
            Topic4
          </div>
        </div>
        <div className="grid grid-cols-5 ">
          <div className="px-5">
            <div className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500">
              100
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              100
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              100
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              100
            </div>
          </div>
          <div>
            <div className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500">
              200
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              200
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              200
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              200
            </div>
          </div>
          <div>
            <div className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500">
              300
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              300
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              300
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              300
            </div>
          </div>
          <div>
            <div className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500">
              500
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              500
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              500
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              500
            </div>
          </div>
          <div>
            <div className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500">
              1000
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              1000
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              1000
            </div>
            <div className="bg-lime-400 mt-2 border-solid border-2 border-black text-center h-10 w-32  rounded-lg hover:rounded-3xl hover:bg-lime-500">
              1000
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

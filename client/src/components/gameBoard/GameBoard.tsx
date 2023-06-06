import React, { useEffect } from 'react';

import { saveQuestion } from '../../redux/store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { RootState } from '../../redux/store/store';

const initState = {
  bool: false,
  category: '',
  question: ""
}

export const GameBoard = () => {

  const dispatch = useAppDispatch()
  const questionGet = useAppSelector((state: RootState) => state.game.game)

  const [gameArr, setGameArr] = React.useState<any>([]);

  const [showModal, setShowModal] = React.useState(initState);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://localhost:3001/game/questions', {
          credentials: 'include',
        });
        const result = await response.json();
        setGameArr(result.gameArr);
        dispatch(saveQuestion(result.gameArr) )
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const openQuestion = (category: number,question: number ) =>{
    
    setShowModal({bool: true,category: questionGet[category].title , question: questionGet[category].questions[question].question})
  }

  const closeQuestion = () => {
    setShowModal({bool: false, category: '',question: ''})
  }

  return (
    <>
    <div className="flex justify-center flex-col">
      {questionGet &&
        questionGet.map((el, index) => (
          <div className="px-5 flex flex-row items-center" key={el.id}>
            <div className="bg-emerald-400 border-solid border-2 border-black text-center h-10 px-2 whitespace-nowrap rounded-lg">{el.title}</div>
            <div className='flex flex-row'>
              {el &&
                el.questions.map((el2, i) =>  <div onClick={() => openQuestion(index, i)} id={el2.id} className="bg-lime-400 border-solid border-2 border-black text-center h-10 w-32 rounded-lg hover:rounded-3xl hover:bg-lime-500" key={el2.id}>{el2.score}</div>
                )}
            </div>
          </div>
        ))}
        {showModal.bool ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              {showModal.category}
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => closeQuestion()}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                              {showModal.question}
                            </p>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => closeQuestion()}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => closeQuestion()}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}  

    </div>
    </>
  );
};

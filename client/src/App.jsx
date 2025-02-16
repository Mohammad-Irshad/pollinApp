import { useEffect, useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPolls, updatePoll } from './app/features/pollsSlice';

function App() {

  const dispatch = useDispatch()
  const { allPolls, status, error } = useSelector((state) => state.polls)

  console.log(allPolls)



  useEffect(() => {
    dispatch(getAllPolls())
    // Set up auto-refresh every 5 seconds
    const interval = setInterval(() => {
      dispatch(getAllPolls());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleVote = (poll, optionIndex) => {
    // Create an updated poll object by incrementing the vote count for the selected option
    dispatch(updatePoll({ pollId: poll._id, updatedData: { optionIndex } }));
  };

  return (
    <>
      <Header />
      <main className='container'>
        <h2>All Polls</h2>
        <div>

          <div className="container my-5">
            <h1 className="text-center mb-4">All Polls</h1>

            {status === 'loading' && <p>Loading...</p>}

            {status === 'success' && allPolls.length > 0 ?

              <div className='row'>

                {allPolls.map((poll) => (
                  <div className='col-md-4'>

                    <div className='card' key={poll._id}>
                      <div className='card-body'>
                        <h5>{poll.question}</h5>
                        <ul className='list-group'>
                          {poll.options.map((op, ind) => (
                            <li key={ind} className='list-group-item'>
                              {op.text} - {op.votes} votes
                              <button
                                className='btn btn-sm btn-primary ms-3'
                                onClick={() => handleVote(poll, ind)}
                              >
                                Vote
                              </button>
                            </li>
                          ))}
                        </ul>
                        <br />

                        {(() => {
                          const maxVotes = Math.max(...poll.options.map(option => option.votes));

                          if (maxVotes === 0) {
                            return (
                              <p className="mt-3">
                                <strong>Leading Option: </strong>
                                No votes yet.
                              </p>
                            );
                          }

                          const winners = poll.options.filter(option => option.votes === maxVotes);

                          const winnerText = winners
                            .map(option => `${option.text} with ${option.votes} votes`)
                            .join(', ');

                          return (
                            <p className="mt-3">
                              <strong>Leading Option(s): </strong>
                              {winnerText}
                            </p>
                          );
                        })()}

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              :

              null

            }


          </div>

        </div>
      </main>
    </>
  )
}

export default App

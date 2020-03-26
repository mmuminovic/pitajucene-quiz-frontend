import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from "react-aux";
import openSocket from "socket.io-client";

import classes from "./Quiz.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../images/logo.png";
import Spinner from "../Spinner/Spinner";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import timerClasses from "./Timer.module.css";
import theBest from "../../images/0.png";
import timeIcon from "../../images/clock.png";
import starIcon from "../../images/star.png";
import like from "../../images/like.png";
import liked from "../../images/liked.png";
import chart from "../../images/chart.png";
import quiz from "../../images/quiz.png";
import user from "../../images/user.png";
import paypal from "../../images/paypal.png";
import about from "../../images/about.png";
import rules from "../../images/rules.png";
import play from "../../images/play.png";

class Quiz extends Component {
  state = {
    started: false,
    finished: false,
    quiz: null,
    gameover: false,
    incorrect: false,
    question: null,
    currentScore: 0,
    ans: null,
    message: null,
    loading: false,
    reportMode: false,
    reportMessage: "",
    errorMessage: "",
    continuing: false,
    remainingTime: 1800,
    quizNotActive: false,
    games: null,
    activeGames: null,
    quizPlayed: null,
    playedToday: null,
    myAnswer: {
      correct: null,
      selected: null
    },
    theBestToday: null,
    numOfQuestion: 1,
    link: null,
    about: false,
    quote: null,
    liked: false,
    stats: false,
    correctAnswer: null,
    mounted: false,
    hardQuestions: []
  };

  componentDidMount() {
    if (this.props.match.params.quizId) {
      this.setState({ loading: true });
      axios
        .post(`/quiz/${this.props.match.params.quizId}`, { continuing: true })
        .then(result => {
          if (result.data.message) {
            this.setState({
              message: result.data.message,
              quizNotActive: true,
              loading: false,
              incorrect: true,
              started: false
            });
            this.props.history.push("/");
          } else {
            const data = result.data;
            this.setState({
              question: data.question,
              quiz: this.props.match.params.quizId,
              gameover: false,
              currentScore: data.score,
              ans: null,
              started: true,
              loading: true,
              finished: false,
              continuing: true,
              remainingTime: data.timeRemaining,
              numOfQuestion: data.question.num
            });
          }
        });
    } else {
      this.props.history.push("/");
      this.getQuote();
      this.getUserInfo();
      this.getNumOfActiveGames();
      this.getNumOfAllGames();
      this.getTheBestToday();
      this.playedToday();

      const socket = openSocket("http://localhost:8080");
      socket.on(`${this.props.user.userId}`, data => {
        console.log(data);
      });
    }
  }

  getQuote = () => {
    axios
      .get("/quotes/get-random-quote", {
        params: { userId: this.props.user.userId }
      })
      .then(result => {
        if (result.data.quoteId) {
          this.setState({ quote: result.data, mounted: true });
        }
      });
  };

  likeQuote = () => {
    const quote = {
      quoteId: this.state.quote.quoteId,
      quoteText: this.state.quote.quoteText,
      quoteAuthor: this.state.quote.quoteAuthor,
      quoteSource: this.state.quote.quoteSource,
      likes: this.state.quote.likes + 1,
      likedByMe: true
    };
    let userId = this.props.user.userId;
    if (!this.state.quote.likedByMe) {
      this.setState({ liked: true, quote: quote });
      axios.patch(`/quotes/like/${this.state.quote.quoteId}`, {
        userId: userId
      });
    }
  };

  getNumOfActiveGames = () => {
    axios.get("/active-games").then(result => {
      this.setState({ activeGames: result.data.activeGames });
    });
  };

  getNumOfAllGames = () => {
    axios.get("/num-of-games").then(result => {
      this.setState({ quizPlayed: result.data.quizPlayed });
    });
  };

  getTheBestToday = () => {
    axios.get("/best-today").then(result => {
      this.setState({ theBestToday: result.data });
    });
  };

  playedToday = () => {
    axios.get("/played-today").then(result => {
      this.setState({ playedToday: result.data.playedToday });
    });
  };

  getUserInfo = () => {
    if (this.props.isAuth) {
      const userId = this.props.user.userId;
      axios.get(`/users/${userId}`).then(result => {
        const data = result.data;
        this.setState({ games: data.quiz });
      });
    }
  };

  createQuiz = () => {
    axios
      .post("/create-quiz", { userId: this.props.user.userId })
      .then(result => {
        const data = result.data;
        this.setState({
          question: data.firstQuestion,
          quiz: data.quiz,
          loading: false,
          numOfQuestion: 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitAnswer = async i => {
    let question = this.state.question;
    let answers = [
      question.answer0,
      question.answer1,
      question.answer2,
      question.answer3
    ];
    await this.setState({
      ...this.state,
      myAnswer: {
        ...this.state.myAnswer,
        selected: i
      },
      ans: answers[i],
      loading: true
    });

    await setTimeout(() => {
      axios
        .post(`/quiz/${this.state.quiz}`, { answer: answers[i] })
        .then(async result => {
          const numOfQuestion = this.state.numOfQuestion;
          let indexOfCorrect = null;
          if (result.data.previousQuestion) {
            answers.forEach((a, i) => {
              if (a === result.data.previousQuestion.correctAnswer) {
                indexOfCorrect = i;
              }
            });
          }

          if (result.data.incorrect) {
            const previousQuestion = {
              question: question,
              link: result.data.previousQuestion.link,
              correctAnswer: result.data.previousQuestion.correctAnswer,
              myAnswer: answers[i]
            };
            await this.setState({
              myAnswer: {
                ...this.state.myAnswer,
                correct: indexOfCorrect
              },
              hardQuestions: [...this.state.hardQuestions, previousQuestion]
            });

            if (result.data.finished) {
              await setTimeout(() => {
                this.setState({
                  ...this.state,
                  gameover: true,
                  finished: true,
                  incorrect: true,
                  loading: false,
                  currentScore: result.data.score,
                  myAnswer: {
                    selected: null,
                    correct: null
                  }
                });
              }, 2000);
            } else {
              await setTimeout(() => {
                this.setState({
                  ...this.state,
                  question: result.data.question,
                  myAnswer: {
                    selected: null,
                    correct: null
                  },
                  loading: false,
                  numOfQuestion: numOfQuestion + 1
                });
              }, 2000);
            }
          } else {
            await this.setState({
              myAnswer: {
                ...this.state.myAnswer,
                incorrect: null,
                correct: i
              }
            });
            if (result.data.finished) {
              await setTimeout(() => {
                this.setState({
                  ...this.state,
                  gameover: true,
                  finished: true,
                  incorrect: true,
                  loading: false,
                  currentScore: result.data.score,
                  myAnswer: {
                    selected: null,
                    correct: null
                  }
                });
              }, 2000);
            } else {
              await setTimeout(() => {
                this.setState({
                  ...this.state,
                  question: result.data.question,
                  myAnswer: {
                    selected: null,
                    correct: null
                  },
                  gameover: result.data.gameover,
                  currentScore: result.data.score,
                  loading: false,
                  numOfQuestion: numOfQuestion + 1
                });
              }, 2000);
            }
          }
        });
    }, 300);
  };

  playAgain = () => {
    this.setState({
      gameover: false,
      currentScore: 0,
      ans: null,
      started: true,
      loading: true,
      finished: false,
      selected: null,
      question: null
    });
    this.createQuiz();
  };

  closeModalHandler = () => {
    this.setState({
      incorrect: false,
      started: false,
      finish: false,
      reportMode: false,
      loading: false,
      about: false,
      quizNotActive: false,
      stats: false,
      correctAnswer: null,
      mounted: false,
      hardQuestions: []
    });
    this.props.history.push("/");
    this.getNumOfActiveGames();
    this.getNumOfAllGames();
    this.getTheBestToday();
    this.playedToday();
  };

  reportModeHandler = () => {
    this.setState({ reportMode: !this.state.reportMode });
  };

  report = () => {
    const data = {
      reportedBy: this.props.user.userId,
      reportedQuestion: this.state.question.text,
      questionId: this.state.question.id,
      message: this.state.reportMessage,
      answer: this.state.ans
    };

    axios.post("/send-report", data).then(result => {
      if (!result.data.error) {
        this.setState({
          reportMode: false,
          loading: false,
          incorrect: false,
          started: false,
          finish: false
        });
      } else {
        this.setState({ errorMessage: result.data.error, loading: false });
      }
    });
  };

  render() {
    let question,
      questionText,
      answers,
      currentScore,
      gameover,
      modalDetails,
      quizDetails,
      points,
      timer,
      timerText,
      quizRemaining,
      ordinalNumOfQuestion,
      quote;

    const { selected, correct } = this.state.myAnswer;

    let ansArray = [null, null, null, null];

    if (typeof(selected) === "number" && typeof(correct) === "number") {
      if (selected === correct) {
        ansArray[selected] = classes.True;
      } else {
        ansArray[selected] = classes.False;
        ansArray[correct] = classes.True;
      }
    } else if (typeof(selected) === "number") {
      ansArray[selected] = classes.Selected;
    }

    const renderTime = value => {
      if (value === 0) {
        return <div className={timerClasses.timer}>0</div>;
      }

      return (
        <div className="timer">
          {/* <div style={{ textAlign: 'center', marginBottom: '0' }}>Ostalo do kraja</div> */}
          <div className={timerClasses.value}>{value}</div>
          {/* <div style={{ textAlign: 'center' }}>sekundi</div> */}
        </div>
      );
    };

    currentScore = (
      <div className={classes.Score}>
        <p>Ostvareni rezultat: </p>
        <p>{this.state.currentScore}</p>
      </div>
    );
    if (this.state.loading) {
      questionText = <Spinner />;
    } else {
      questionText = null;
    }

    if (!this.state.started) {
      if (this.state.games) {
        const quizFound = this.state.games.find(
          q => !q.timeIsUp && !q.incorrect
        );
        if (quizFound) {
          let myProfileLink = `/korisnik/${this.props.user.userId}`;
          quizRemaining = (
            <Link
              style={{ color: "red", fontWeight: "bold" }}
              to={myProfileLink}
            >
              Imate kviz koji niste završili! Kliknite na ovaj link da
              nastavite.
            </Link>
          );
        }
      }
      if (this.state.quote) {
        quote = (
          <Aux>
            <blockquote className={classes.Blockquote}>
              &quot;{this.state.quote.quoteText}&quot;
              <p style={{ marginTop: "5px" }}>
                {this.state.quote.quoteSource
                  ? `(${this.state.quote.quoteSource})`
                  : null}
              </p>
              <span>{this.state.quote.quoteAuthor}</span>
              <span>
                <img
                  src={
                    this.state.quote.likedByMe || this.state.liked
                      ? liked
                      : like
                  }
                  width="20px"
                  alt="like"
                  onClick={this.likeQuote}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
                {this.state.quote.likes}
              </span>
            </blockquote>
            <div className={classes.Button}>
              <button onClick={this.closeModalHandler}>Zatvori</button>
            </div>
          </Aux>
        );
      }
      quizDetails = (
        <div className={classes.Gameover}>
          <p
            style={{
              fontSize: "medium",
              fontWeight: "bold",
              color: "#5696BC",
              fontStyle: "italic",
              margin: "0"
            }}
          >
            Dobrodošli na islamski kviz znanja
          </p>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.pitajucene.com"
            >
              <img src={Logo} width="100px" alt="logo" />
            </a>
          </div>
          {quizRemaining}

          <div>
            <button onClick={this.playAgain}>
              <img
                src={play}
                alt="quiz"
                width="20px"
                style={{ marginRight: "10px" }}
              />
              Pokreni kviz
            </button>
            <button onClick={() => this.setState({ incorrect: true })}>
              <img
                src={rules}
                alt="quiz"
                width="20px"
                style={{ marginRight: "10px" }}
              />
              Pravila igre
            </button>
          </div>
          <div>
            <button
              onClick={() => this.setState({ incorrect: true, about: true })}
            >
              <img
                src={about}
                alt="quiz"
                width="20px"
                style={{ marginRight: "10px" }}
              />
              O aplikaciji
            </button>
            <button
              onClick={() => this.setState({ incorrect: true, stats: true })}
            >
              <img
                src={chart}
                alt="quiz"
                width="20px"
                style={{ marginRight: "10px" }}
              />
              Statistika
            </button>
          </div>
          <div>
            <a
              href="https://www.paypal.me/pitajucenefond"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p
                style={{
                  margin: "10px 0 5px",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Ugradi se u ovaj hajr, podrži rad stranice i kviza
              </p>
              <img src={paypal} alt="donate" width="120px" />
            </a>
          </div>
        </div>
      );
      modalDetails = (
        <div className={classes.Rules}>
          <p style={{ fontSize: "medium", fontWeight: "bold" }}>
            Pravila igre:
          </p>
          <p>- Kviz se sastoji od 60 pitanja i 3 nivoa:</p>
          <table style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", padding: "5px 10px" }}>
                  <em>20 pitanja od po 10 bodova</em>
                </td>
                <td style={{ border: "1px solid black", padding: "5px 10px" }}>
                  <em>20 pitanja od po 15 bodova</em>
                </td>
                <td style={{ border: "1px solid black", padding: "5px 10px" }}>
                  <em>20 pitanja od po 20 bodova</em>
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              Ovaj kviz je edukativno-zabavanog karaktera, sistemske greške su
              rijetke ali su moguće te smo iz tog razloga ostavili mogućnost
              prijave pitanja i link na kojem možete pročitati original odgovor
              na svako pitanje.
            </li>
            <li>
              Kviz traje <strong>10 minuta.</strong>
            </li>
            <li>
              Ukoliko takmičari imaju isti broj bodova biće rangirani prema
              najkraćem vremenu.
            </li>
            <li>
              Koje su nagrade ovog mjeseca možete vidjeti na našoj stranici{" "}
              <a
                style={{ color: "#E04836" }}
                href="https://pitajucene.com/nagradni-kviz"
              >
                pitajucene.com/nagradni-kviz
              </a>
            </li>
            <li>
              Najbolji u mjesecu će biti kontaktirani putem email adrese s kojom
              su se registrovali.
            </li>
            <li>
              Knjige koje dajemo kao nagradu su nove ili korištene bez velikih
              oštećenja, jer mnoge knjige dobijemo kao donaciju.
            </li>
            <li>
              Poštarinu za dostavu knjige izvan Bosne i Hercegovine plaća
              dobitnik knjige.
            </li>
            <li style={{ fontWeight: "bold" }}>
              Učesnici kviza sa neispravnom email adresom gube pravo na nagradu.
            </li>
            <li style={{ fontStyle: "italic" }}>
              "Ko nas vara nije od nas" - Muhammed, sallallahu alejhi ve sellem
            </li>
          </ul>
          <div className={classes.Button}>
            <button onClick={this.closeModalHandler}>Zatvori</button>
          </div>
        </div>
      );
      if (this.state.stats) {
        modalDetails = (
          <div className={classes.TableInfo}>
            <table className={classes.Table}>
              <thead>
                <tr>
                  <th colSpan="2">
                    <img src={theBest} alt="medal" /> Najuspješniji/a danas:
                  </th>
                </tr>
                <tr>
                  <th>
                    <img src={user} width="20px" alt="user" />
                  </th>
                  <td>
                    {this.state.theBestToday
                      ? this.state.theBestToday.fullName
                      : null}
                  </td>
                </tr>
                <tr>
                  <th>
                    <img src={starIcon} alt="score" />
                  </th>
                  <td>
                    {this.state.theBestToday
                      ? this.state.theBestToday.score
                      : null}
                  </td>
                </tr>
                <tr>
                  <th>
                    <img src={timeIcon} alt="time" />
                  </th>
                  <td>
                    {this.state.theBestToday
                      ? this.state.theBestToday.duration
                      : null}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan="2">
                    <img src={quiz} alt="medal" />
                    Kviz
                  </th>
                </tr>
                <tr>
                  <th>Odigrano kvizova:</th>
                  <td>{this.state.quizPlayed}</td>
                </tr>

                <tr>
                  <th>Odigrano danas:</th>
                  <td>{this.state.playedToday}</td>
                </tr>
                <tr>
                  <th>Trenutno igra:</th>
                  <td>{this.state.activeGames}</td>
                </tr>
              </tbody>
            </table>
            <div className={classes.Button} style={{ textAlign: "center" }}>
              <button
                onClick={this.closeModalHandler}
                style={{ padding: "5px" }}
              >
                Zatvori
              </button>
            </div>
          </div>
        );
      }
      if (this.state.about) {
        modalDetails = (
          <div className={classes.Rules}>
            <table className={classes.Table} style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Verzija kviza</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>v1.4</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Datum početka kviza</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10.01.2020.</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Unosio pitanja</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://pitajucene.com/profile/sedin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sedin Kutlovac
                    </a>
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Aplikaciju razvio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://pitajucene.com/profile/muhamed-muminovic/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Muhamed Muminović
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={classes.Button}>
              <button onClick={this.closeModalHandler}>Zatvori</button>
            </div>
            <p>
              © 2020 Pitaj Učene -{" "}
              <a
                style={{ color: "#E04836" }}
                href="https://pitajucene.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                pitajucene.com
              </a>
            </p>
          </div>
        );
      }
      if (this.state.quizNotActive) {
        modalDetails = (
          <div className={classes.ModalInfo}>
            <p style={{ fontWeight: "500" }}>{this.state.message}</p>
            <div style={{ border: "none" }} className={classes.Button}>
              <Button clicked={this.closeModalHandler} text="Zatvori" />
            </div>
          </div>
        );
      }
      currentScore = null;
    } else if (this.state.finished) {
      modalDetails = (
        <div className={classes.ModalInfo}>
          <p>Čestitamo! Stigli ste do kraja kviza.</p>
          <p>Ostvareni rezultat: {this.state.currentScore}</p>
          <div>
            <p>Poslanik, sallallahu alejhi ve sellem, je rekao:</p>
            <p
              style={{
                textAlign: "justify",
                padding: "0 15px",
                fontSize: "small"
              }}
            >
              "Ko krene putem na kojem traži znanje, Allah će ga, doista,
              usmjeriti ka putu od puteva koji vode u Džennet. Doista meleki
              prostiru svoja krila od dragosti pred onim koji traži znanje..."
              (dio hadisa)
            </p>
            <p>Hadis bilježe Ebu Davud, Tirmizi i drugi.</p>
          </div>
          <div className={classes.Button}>
            <button onClick={this.closeModalHandler}>Nastavi</button>
          </div>
        </div>
      );
    } else if (this.state.question && !this.state.gameover) {
      question = this.state.question;
      questionText = (
        <div className={classes.Question}>
          <p style={{ margin: "0" }}>{question.text}</p>
        </div>
      );
      ordinalNumOfQuestion = (
        <div
          className={classes.Button}
          style={{ textAlign: "center", margin: "0" }}
        >
          <p
            style={{
              fontSize: "small",
              color: "white",
              textAlign: "center",
              margin: "10px 0"
            }}
          >
            {this.state.numOfQuestion}/60
          </p>
          {/* <button
            onClick={() => this.submitAnswer(null, true)}
            style={{ padding: "5px" }}
          >
            Preskoči pitanje
          </button> */}
        </div>
      );
      timerText = (
        <p className={classes.TimerText}>Tajmer se nalazi na dnu ekrana</p>
      );
      points = (
        <p
          style={{
            textAlign: "center",
            color: "white",
            margin: "0",
            fontStyle: "italic",
            fontSize: "13px"
          }}
        >
          Tačan odgovor nosi:{" "}
          <span style={{ color: "#F39D41", fontWeight: "bold" }}>
            {question.points}
          </span>{" "}
          bodova
        </p>
      );
      let answersArray = [
        <li
          key="0"
          className={ansArray[0]}
          onClick={() => this.submitAnswer(0)}
        >
          {question.answer0}
        </li>,
        <li
          key="1"
          className={ansArray[1]}
          onClick={() => this.submitAnswer(1)}
        >
          {question.answer1}
        </li>,
        <li
          key="2"
          className={ansArray[2]}
          onClick={() => this.submitAnswer(2)}
        >
          {question.answer2}
        </li>,
        <li
          key="3"
          className={ansArray[3]}
          onClick={() => this.submitAnswer(3)}
        >
          {question.answer3}
        </li>
      ];
      answers = (
        <div className={classes.Answers}>
          <ul>{answersArray}</ul>
        </div>
      );
      timer = (
        <div>
          <p
            style={{
              textAlign: "center",
              margin: "0",
              fontWeight: "500",
              color: "white"
            }}
          >
            Prostalo vrijeme:
          </p>
          <CountdownCircleTimer
            isPlaying
            durationSeconds={this.state.remainingTime}
            colors={[
              ["#5696BC", 0.75],
              ["#ff6600", 0.2],
              ["#ff0000", 0.05]
            ]}
            renderTime={renderTime}
            onComplete={() => [false]}
            size={65}
          />
        </div>
      );
    } else if (this.state.gameover) {
      currentScore = null;
      gameover = (
        <div className={classes.Gameover}>
          <p>{this.state.message}</p>
          <Button clicked={this.playAgain} text="Igraj ponovo" />
        </div>
      );
      //   if (!this.state.reportMode) {
      //     modalDetails = (
      //       <div className={classes.ModalInfo}>
      //         <p
      //           style={{
      //             backgroundColor: "#E04836",
      //             fontWeight: "bold",
      //             padding: "20px 0",
      //             borderRadius: "10px"
      //           }}
      //         >
      //           Pogriješili ste odgovor
      //         </p>
      //         <p style={{ margin: "10px 0" }}>Na pitanje: </p>
      //         <div>
      //           <p style={{ textAlign: "justify", margin: "10px" }}>
      //             <strong>{this.state.question ? this.state.question.text : null}</strong>
      //           </p>
      //         </div>
      //         <p className={classes.Incorrect}>
      //           Vaš odgovor: <strong>{this.state.ans}</strong>
      //         </p>
      //         <p className={classes.Incorrect} style={{ color: "green" }}>
      //           Tačan odgovor: <strong>{this.state.correctAnswer}</strong>
      //         </p>
      //         <p className={classes.Link}>
      //           Pročitajte više na linku:
      //           <br />
      //           <a
      //             target="_blank"
      //             href={this.state.link}
      //             rel="noopener noreferrer"
      //           >
      //             {this.state.link}
      //           </a>
      //         </p>
      //         <div style={{ border: "none" }} className={classes.Button}>
      //           <Button clicked={this.closeModalHandler} text="Zatvori" />
      //         </div>
      //         <div
      //           style={{ border: "none" }}
      //           className={[classes.Button, classes.Danger].join(" ")}
      //         >
      //           <Button
      //             clicked={this.reportModeHandler}
      //             text="Prijavi nepravilnost"
      //           />
      //         </div>
      //       </div>
      //     );
      //   } else {
      modalDetails = (
        <div className={classes.ModalInfo}>
          <p>Popunite polja i pošaljite nepravilnost koju ste uočili</p>
          <p style={{ margin: "10px 0 0 0" }}>Na pitanje: </p>
          <div>
            <p style={{ textAlign: "justify", margin: "10px" }}>
              <strong>{this.state.question.text}</strong>
            </p>
          </div>
          <p className={classes.Incorrect}>
            Vaš odgovor: <strong>{this.state.ans}</strong>
          </p>
          <div style={{ border: "none" }}>
            <p
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                marginBottom: "0"
              }}
            >
              Unesite poruku
            </p>
            <p
              style={{
                fontSize: "small",
                fontWeight: "bold",
                color: "red",
                margin: "0"
              }}
            >
              {this.state.errorMessage}
            </p>
            <textarea
              style={{ width: "100%" }}
              onChange={event =>
                this.setState({ reportMessage: event.target.value })
              }
              placeholder='Ovde napišite vašu primedbu na ovo pitanje a zatim pritisnite dugme "Prijavi". Tekst mora biti minimum 10 a maksimum 200 karaktera.'
            />
          </div>
          <div
            style={{ border: "none" }}
            className={[classes.Button, classes.Danger].join(" ")}
          >
            <Button clicked={this.report} text="Prijavi" />
          </div>
          <div style={{ border: "none" }} className={classes.Button}>
            <button onClick={this.reportModeHandler}>Odustani</button>
          </div>
        </div>
      );
      //   }
    }

    if (this.state.mounted) {
      modalDetails = (
        <div style={{ textAlign: "justify", textAlignLast: "center" }}>
          {quote}
        </div>
      );
    }

    return (
      <Container>
        <Row>
          <Col md={12}>
            <Modal
              show={this.state.incorrect || this.state.mounted}
              modalClosed={this.closeModalHandler}
            >
              {modalDetails}
            </Modal>
            <div className={classes.Quiz}>
              {quizDetails}
              {questionText}
              {ordinalNumOfQuestion}
              {timerText}
              {answers}
              {gameover}
              {points}
              {currentScore}
              {timer}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, null)(Quiz);

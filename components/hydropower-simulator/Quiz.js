"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/lib/quizQuestions";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (quizQuestions[currentQuestion].answers[answerIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Gratulacje! Ukończyłeś quiz!
        </h2>
        <div className="text-center mb-6">
          <p className="text-xl mb-4">
            Twój wynik: {score} z {quizQuestions.length} ({percentage}%)
          </p>
          <p className="text-lg">
            {percentage >= 80
              ? "Świetnie! Jesteś ekspertem od energii wodnej! 🌟"
              : percentage >= 60
              ? "Dobra robota! Masz solidną wiedzę o elektrowniach wodnych! 👍"
              : "Dziękujemy za udział! Może warto przeczytać jeszcze raz informacje o elektrowniach wodnych? 📚"}
          </p>
        </div>
        <div className="text-center">
          <Button onClick={resetQuiz}>Spróbuj ponownie</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">
        Pytanie {currentQuestion + 1} z {quizQuestions.length}
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {quizQuestions[currentQuestion].question}
      </h2>

      <div className="space-y-3">
        {quizQuestions[currentQuestion].answers.map((answer, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              selectedAnswer === null
                ? "hover:bg-gray-100"
                : selectedAnswer === index
                ? answer.correct
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : answer.correct
                ? "bg-green-100 border-green-500"
                : "bg-gray-50"
            }`}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            {quizQuestions[currentQuestion].explanation}
          </p>
        </div>
      )}

      {selectedAnswer !== null && (
        <div className="mt-6 text-center">
          <Button onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1
              ? "Następne pytanie"
              : "Zakończ quiz"}
          </Button>
        </div>
      )}
    </Card>
  );
}

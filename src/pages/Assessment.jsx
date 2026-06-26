import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, BookOpen } from 'lucide-react'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import { supabase } from '../lib/supabase'

const questions = [
  { id: 1, topic: "Fundamentals", question: "What is the correct way to define a function in Python?", options: ["function myFunc():", "def myFunc():", "define myFunc():", "func myFunc():"], answer: 1 },
  { id: 2, topic: "Fundamentals", question: "Which of the following is NOT a valid Python data type?", options: ["int", "float", "char", "bool"], answer: 2 },
  { id: 3, topic: "Fundamentals", question: "What is the output of: print(type(3.14))?", options: ["<class 'int'>", "<class 'double'>", "<class 'float'>", "<class 'decimal'>"], answer: 2 },
  { id: 4, topic: "Fundamentals", question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "exp()", "^^"], answer: 1 },
  { id: 5, topic: "Fundamentals", question: "What is the output of: print(10 // 3)?", options: ["3.33", "3", "4", "1"], answer: 1 },
  { id: 6, topic: "Fundamentals", question: "Which of the following correctly declares a multi-line string in Python?", options: ["/* string */", "# string #", 'triple-quoted string', "//string//"], answer: 2 },
  { id: 7, topic: "Fundamentals", question: "What does the modulo operator (%) return?", options: ["The quotient of division", "The remainder of division", "The percentage value", "The absolute value"], answer: 1 },
  { id: 8, topic: "Fundamentals", question: "How do you insert a comment in Python?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "-- This is a comment"], answer: 2 },
  { id: 9, topic: "Fundamentals", question: "What is the output of: print(bool(0))?", options: ["True", "False", "0", "None"], answer: 1 },
  { id: 10, topic: "Fundamentals", question: "Which method converts a string to all uppercase?", options: [".toUpper()", ".uppercase()", ".upper()", ".toUpperCase()"], answer: 2 },
  { id: 11, topic: "Fundamentals", question: "What is the output of: print(len('ZeToD'))?", options: ["4", "5", "6", "Error"], answer: 1 },
  { id: 12, topic: "Fundamentals", question: "Which of the following is used to take input from the user in Python?", options: ["scan()", "readline()", "input()", "get()"], answer: 2 },
  { id: 13, topic: "Fundamentals", question: "What will print('Hello' * 3) output?", options: ["Hello Hello Hello", "HelloHelloHello", "Hello3", "Error"], answer: 1 },
  { id: 14, topic: "Fundamentals", question: "Which of the following is a correct variable name in Python?", options: ["2variable", "my-variable", "my_variable", "my variable"], answer: 2 },
  { id: 15, topic: "Fundamentals", question: "What is the output of: print(10 != 10)?", options: ["True", "False", "10", "None"], answer: 1 },
  { id: 16, topic: "Control Flow", question: "What is the output of:\nfor i in range(3):\n    print(i)", options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], answer: 1 },
  { id: 17, topic: "Control Flow", question: "Which keyword is used to skip the current iteration in a loop?", options: ["break", "pass", "continue", "skip"], answer: 2 },
  { id: 18, topic: "Control Flow", question: "What does the 'break' statement do in a loop?", options: ["Skips the current iteration", "Pauses the loop", "Exits the loop entirely", "Restarts the loop"], answer: 2 },
  { id: 19, topic: "Control Flow", question: "Which keyword is used to handle exceptions in Python?", options: ["catch", "error", "except", "handle"], answer: 2 },
  { id: 20, topic: "Control Flow", question: "What is the purpose of the 'else' clause on a for loop in Python?", options: ["Runs if the loop encounters an error", "Runs if the loop completes without hitting a break", "Runs at the start of every iteration", "It is not valid syntax"], answer: 1 },
  { id: 21, topic: "Control Flow", question: "What is the output of:\nx = 5\nif x > 3:\n    print('A')\nelif x > 4:\n    print('B')\nelse:\n    print('C')", options: ["A", "B", "C", "A B"], answer: 0 },
  { id: 22, topic: "Control Flow", question: "Which block always executes whether or not an exception is raised?", options: ["try", "except", "else", "finally"], answer: 3 },
  { id: 23, topic: "Control Flow", question: "What does 'pass' do in Python?", options: ["Exits the function", "Skips to the next iteration", "Does nothing — acts as a placeholder", "Raises an exception"], answer: 2 },
  { id: 24, topic: "Control Flow", question: "What is the output of:\ni = 0\nwhile i < 3:\n    i += 1\nprint(i)", options: ["0", "2", "3", "4"], answer: 2 },
  { id: 25, topic: "Control Flow", question: "How do you raise a custom exception in Python?", options: ["throw Exception('msg')", "raise Exception('msg')", "error Exception('msg')", "trigger Exception('msg')"], answer: 1 },
  { id: 26, topic: "Functions & Scope", question: "What is a lambda function in Python?", options: ["A function defined with the def keyword", "A function that runs automatically on startup", "A small anonymous function defined with the lambda keyword", "A function that can only take one argument"], answer: 2 },
  { id: 27, topic: "Functions & Scope", question: "What is the output of:\ndef add(a, b=5):\n    return a + b\nprint(add(3))", options: ["Error", "3", "8", "5"], answer: 2 },
  { id: 28, topic: "Functions & Scope", question: "What does *args allow in a function definition?", options: ["Passes keyword arguments as a dictionary", "Passes a variable number of positional arguments as a tuple", "Makes all arguments optional", "Forces arguments to be integers"], answer: 1 },
  { id: 29, topic: "Functions & Scope", question: "What does **kwargs allow in a function definition?", options: ["Passes a variable number of positional arguments", "Passes keyword arguments as a dictionary", "Doubles all argument values", "Restricts the function to two arguments"], answer: 1 },
  { id: 30, topic: "Functions & Scope", question: "What is the scope of a variable defined inside a function?", options: ["Global", "Module-level", "Local", "Class-level"], answer: 2 },
  { id: 31, topic: "Functions & Scope", question: "Which keyword allows a function to modify a global variable?", options: ["extern", "global", "nonlocal", "public"], answer: 1 },
  { id: 32, topic: "Functions & Scope", question: "What does a function return if it has no return statement?", options: ["0", "False", "None", "Error"], answer: 2 },
  { id: 33, topic: "Functions & Scope", question: "What is a decorator in Python?", options: ["A way to add CSS styles to output", "A function that takes another function and extends its behaviour", "A class method that initialises objects", "A built-in function for formatting strings"], answer: 1 },
  { id: 34, topic: "Data Structures", question: "Which of the following creates an empty dictionary?", options: ["[]", "()", "{}", "dict[]"], answer: 2 },
  { id: 35, topic: "Data Structures", question: "Which data structure does NOT allow duplicate values?", options: ["list", "tuple", "set", "dictionary values"], answer: 2 },
  { id: 36, topic: "Data Structures", question: "How do you add an item to a list in Python?", options: [".add()", ".push()", ".append()", ".insert(0)"], answer: 2 },
  { id: 37, topic: "Data Structures", question: "What is the output of:\nmy_list = [1, 2, 3]\nprint(my_list[-1])", options: ["1", "3", "-1", "Error"], answer: 1 },
  { id: 38, topic: "Data Structures", question: "Which of the following is immutable?", options: ["list", "dict", "set", "tuple"], answer: 3 },
  { id: 39, topic: "Data Structures", question: "What does the .get() method on a dictionary do?", options: ["Returns all keys", "Returns the value for a key, or a default if the key does not exist", "Deletes a key", "Checks if a key exists and raises an error if not"], answer: 1 },
  { id: 40, topic: "Data Structures", question: "What is a list comprehension in Python?", options: ["A method to sort a list", "A concise way to create a list using a single line expression", "A built-in function for filtering lists", "A way to compress a list to save memory"], answer: 1 },
  { id: 41, topic: "Data Structures", question: "What is the output of:\nmy_tuple = (1, 2, 3)\nmy_tuple[0] = 10", options: ["(10, 2, 3)", "10", "None", "TypeError"], answer: 3 },
  { id: 42, topic: "OOP", question: "What is the purpose of the '__init__' method in a Python class?", options: ["It destroys the object when done", "It initialises the object's attributes when an instance is created", "It is called every time a method is used", "It defines class-level constants"], answer: 1 },
  { id: 43, topic: "OOP", question: "What is the purpose of 'self' in a Python class method?", options: ["It refers to the class itself", "It refers to the current instance of the class", "It is a reserved keyword with no specific purpose", "It refers to the parent class"], answer: 1 },
  { id: 44, topic: "OOP", question: "Which keyword is used to inherit from a parent class in Python?", options: ["extends", "inherits", "super", "Passed in parentheses e.g. class Child(Parent)"], answer: 3 },
  { id: 45, topic: "OOP", question: "What is method overriding?", options: ["Defining two methods with the same name in the same class", "Redefining a parent class method in a child class", "Calling a method before it is defined", "Making a method private"], answer: 1 },
  { id: 46, topic: "OOP", question: "What does the 'super()' function do?", options: ["Creates a new instance of the parent class", "Deletes the parent class", "Calls a method from the parent class", "Checks if a class has a parent"], answer: 2 },
  { id: 47, topic: "File Handling & Modules", question: "Which mode opens a file for reading in Python?", options: ["'w'", "'r'", "'a'", "'x'"], answer: 1 },
  { id: 48, topic: "File Handling & Modules", question: "What is the correct way to import a module in Python?", options: ["include math", "require math", "import math", "#import math"], answer: 2 },
  { id: 49, topic: "File Handling & Modules", question: "What is the advantage of using 'with open()' to handle files?", options: ["It opens the file faster", "It automatically closes the file when the block exits, even if an error occurs", "It allows reading and writing at the same time", "It converts the file content to a list automatically"], answer: 1 },
  { id: 50, topic: "File Handling & Modules", question: "What does the 'os' module in Python primarily provide?", options: ["Tools for working with databases", "Tools for building web servers", "Tools for interacting with the operating system (files, directories, environment)", "Tools for mathematical operations"], answer: 2 },
]

const TOPICS = [...new Set(questions.map((q) => q.topic))]

const topicRecommendations = {
  "Fundamentals": {
    what: "Python syntax, data types, variables, operators, and string methods",
    resource: "Python.org Official Tutorial — Sections 3 & 4",
    url: "https://docs.python.org/3/tutorial/introduction.html"
  },
  "Control Flow": {
    what: "if/elif/else, for/while loops, break/continue/pass, try/except/finally",
    resource: "Python.org Official Tutorial — Section 4",
    url: "https://docs.python.org/3/tutorial/controlflow.html"
  },
  "Functions & Scope": {
    what: "def, return, lambda, *args, **kwargs, variable scope, decorators",
    resource: "Python.org Official Tutorial — Section 4.7",
    url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
  },
  "Data Structures": {
    what: "lists, tuples, sets, dictionaries, list comprehensions",
    resource: "Python.org Official Tutorial — Section 5",
    url: "https://docs.python.org/3/tutorial/datastructures.html"
  },
  "OOP": {
    what: "classes, __init__, self, inheritance, super(), method overriding",
    resource: "Python.org Official Tutorial — Section 9",
    url: "https://docs.python.org/3/tutorial/classes.html"
  },
  "File Handling & Modules": {
    what: "open(), file modes, with statement, import, os module",
    resource: "Python.org Official Tutorial — Sections 6 & 7",
    url: "https://docs.python.org/3/tutorial/inputoutput.html"
  },
}

export default function Assessment() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const q = questions[current]
  const total = questions.length
  const answered = Object.keys(selected).length
  const score = submitted ? questions.filter((q) => selected[q.id] === q.answer).length : 0
  const percent = submitted ? Math.round((score / total) * 100) : 0

  const topicScores = submitted
    ? TOPICS.map((topic) => {
        const topicQs = questions.filter((q) => q.topic === topic)
        const correct = topicQs.filter((q) => selected[q.id] === q.answer).length
        const p = Math.round((correct / topicQs.length) * 100)
        return { topic, correct, total: topicQs.length, percent: p, needsWork: p < 70 }
      })
    : []

  const weakTopics = topicScores.filter((t) => t.needsWork)

  const handleSelect = (i) => { if (!submitted) setSelected((prev) => ({ ...prev, [q.id]: i })) }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await supabase.from('assessment_results').insert({
          user_id: session.user.id, assessment_type: 'theory',
          assessment_title: 'Python Fundamentals', score, total, percent,
          answers: selected, completed_at: new Date().toISOString(),
        })
      }
    } catch (err) { console.error('Could not save result:', err) }
    setSaving(false)
    setSubmitted(true)
  }

  const getBadge = () => {
    if (percent >= 90) return { label: 'Expert', color: 'text-green-400 border-green-400' }
    if (percent >= 70) return { label: 'Proficient', color: 'text-blue-400 border-blue-400' }
    if (percent >= 50) return { label: 'Developing', color: 'text-yellow-400 border-yellow-400' }
    return { label: 'Beginner', color: 'text-red-400 border-red-400' }
  }

  if (submitted) {
    const badge = getBadge()
    return (
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Score Card */}
          <Card className="p-8 text-center mb-6">
            <Award size={48} className={`mx-auto mb-4 ${percent >= 70 ? 'text-green-400' : 'text-yellow-400'}`} />
            <h2 className="font-heading text-2xl font-semibold text-text mb-1">Assessment Complete</h2>
            <p className="text-muted text-sm mb-6">Python Fundamentals · 50 Questions · Theory</p>
            <div className="text-6xl font-bold text-primary mb-2">{percent}%</div>
            <p className="text-muted text-sm mb-4">{score} out of {total} correct</p>
            <span className={`inline-block px-4 py-1 rounded-full border text-sm font-medium ${badge.color}`}>{badge.label}</span>
          </Card>

          {/* Topic Scores */}
          <Card className="p-6 mb-6">
            <h3 className="font-heading text-sm font-semibold text-text mb-4 uppercase tracking-wider">Score by Topic</h3>
            <div className="space-y-4">
              {topicScores.map(({ topic, correct, total: t, percent: p, needsWork }) => (
                <div key={topic}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted flex items-center gap-2">
                      {topic}
                      {needsWork && <span className="text-xs text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded-full">Needs work</span>}
                    </span>
                    <span className="text-text font-medium">{correct}/{t} · {p}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${p >= 70 ? 'bg-green-400' : p >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Study Recommendations — only shown if weak topics exist */}
          {weakTopics.length > 0 && (
            <Card className="p-6 mb-6 border-amber-400/30 bg-amber-400/5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-amber-400" />
                <h3 className="font-heading text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  Recommended Study Areas
                </h3>
              </div>
              <p className="text-muted text-xs mb-4">
                You scored below 70% in the following topics. Focus on these before retaking the assessment.
              </p>
              <div className="space-y-4">
                {weakTopics.map(({ topic, percent: p }) => {
                  const rec = topicRecommendations[topic]
                  return (
                    <div key={topic} className="border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text text-sm font-semibold">{topic}</span>
                        <span className={`text-xs font-medium ${p >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{p}%</span>
                      </div>
                      <p className="text-muted text-xs mb-2">
                        <span className="text-white/60">Focus on: </span>{rec.what}
                      </p>
                      <a
                        href={rec.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <BookOpen size={11} /> {rec.resource}
                      </a>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Question Review */}
          <Card className="p-6 mb-6">
            <h3 className="font-heading text-sm font-semibold text-text mb-4 uppercase tracking-wider">Question Review</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {questions.map((q) => {
                const isCorrect = selected[q.id] === q.answer
                return (
                  <div key={q.id} className="flex items-start gap-3 text-sm py-1">
                    {isCorrect ? <CheckCircle size={15} className="text-green-400 shrink-0 mt-0.5" /> : <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />}
                    <div>
                      <span className="text-muted">{q.question.split('\n')[0]}</span>
                      {!isCorrect && <p className="text-xs text-green-400 mt-0.5">Correct: {q.options[q.answer]}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <button onClick={() => navigate('/dashboard')} className="w-full bg-primary text-background font-medium py-3 rounded-lg hover:opacity-90 transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-white/10 px-4 py-4 sticky top-0 bg-background z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-muted text-sm hover:text-text transition">
            <ArrowLeft size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={answered < total || saving}
              className="flex items-center gap-2 bg-primary text-background text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition">
              {saving ? 'Saving...' : 'Submit Assessment'} <ArrowRight size={16} />
            </button>
          )}
        </div>
        {answered < total && current === total - 1 && (
          <p className="text-center text-xs text-muted mt-4">Answer all {total} questions before submitting</p>
        )}
      </Container>
    </div>
  )
}

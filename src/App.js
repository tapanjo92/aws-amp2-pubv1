import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import { v4 as uuidv4 } from 'uuid';

// Configure Amplify with your backend settings from amplify_outputs.json
Amplify.configure(awsExports);

function App() {
  // State to hold form data (here just a couple of fields for demo)
  const [questionText, setQuestionText] = useState('');
  const [passageText, setPassageText] = useState('');

  // Function to add a new Question to DynamoDB
  const addQuestion = async () => {
    // Generate a client for your Amplify Gen2 data service
    const client = generateClient();
    try {
      await client.models.Question.create({
        // Generate a unique UUID for the primary key
        questionId: uuidv4(),
        questionText: questionText,
        passageText: passageText,
        options: {
          A: 'Option A text',
          B: 'Option B text',
          C: 'Option C text',
          D: 'Option D text',
        },
        correctAnswer: 'B',
        answerExplanation:
          'The passage explains that the waggle dance communicates the location of a food source.',
        category: 'Biology',
        subCategory: 'Animal Behavior',
        questionType: 'Multiple Choice',
        difficulty: 'Medium',
        status: 'Published',
        tags: ['honeybee', 'communication', 'nectar'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      });
      alert('Question added successfully!');
      // Optionally clear the form fields here
      setQuestionText('');
      setPassageText('');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Error adding question. Check the console for details.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Add a New Question</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter question text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          placeholder="Enter passage text"
          value={passageText}
          onChange={(e) => setPassageText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', height: '100px' }}
        />
      </div>
      <button onClick={addQuestion} style={{ padding: '0.5rem 1rem' }}>
        Add Question
      </button>
    </div>
  );
}

export default App;


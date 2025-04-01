import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GetAIResponse } from './GetAIResponse';

function AIAssistant() {
    const [activeTab, setActiveTab] = useState('recommendations');
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        setIsLoading(true);
        setResponse('');

        try {
            let context = '';
            switch (activeTab) {
                case 'recommendations':
                    context = "Provide tailored job recommendations based on the user's input. Consider skills, experience, and preferences. Format as a list with brief explanations.";
                    break;
                case 'resume':
                    context = "Analyze the provided resume content and suggest improvements. Focus on formatting, keywords, and impact. Provide specific suggestions.";
                    break;
                case 'advice':
                    context = "Offer professional career advice based on the user's question. Be supportive and provide actionable steps.";
                    break;
                default:
                    context = "Provide helpful career-related information.";
            }

            const aiResponse = await GetAIResponse(input, context);
            setResponse(aiResponse);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error: Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portal
                </Button>

                <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                    <Sparkles className="mr-2 text-purple-600" /> AI Career Assistant
                </h1>

                <div className="flex overflow-x-auto mb-6 border-b">
                    {['recommendations', 'resume', 'advice'].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 font-medium whitespace-nowrap ${
                                activeTab === tab 
                                    ? 'border-b-2 border-purple-600 text-purple-600' 
                                    : 'text-gray-500'
                            }`}
                            onClick={() => {
                                setActiveTab(tab);
                                setInput('');
                                setResponse('');
                            }}
                        >
                            {tab === 'recommendations' && 'Job Recommendations'}
                            {tab === 'resume' && 'Resume Optimization'}
                            {tab === 'advice' && 'Career Advice'}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                                {activeTab === 'recommendations' && "What kind of jobs are you looking for?"}
                                {activeTab === 'resume' && "Paste your resume or describe your experience"}
                                {activeTab === 'advice' && "What career advice are you looking for?"}
                            </label>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                rows={4}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    activeTab === 'recommendations' ? "E.g., I'm looking for remote frontend developer roles..." :
                                    activeTab === 'resume' ? "Paste your resume content here..." :
                                    "E.g., How can I transition from marketing to product management?"
                                }
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Get AI Assistance"}
                            <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>

                {response && (
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <h3 className="font-semibold text-lg mb-2">AI Response:</h3>
                        <div className="prose max-w-none text-sm sm:text-base">
                            {response.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AIAssistant;
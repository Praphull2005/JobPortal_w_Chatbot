import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

function AIButton() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="fixed right-4 bottom-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="default"
        className="rounded-full p-6 shadow-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        onClick={() => navigate('/ai-assistant')}
      >
        <Sparkles className="h-6 w-6" />
        {isHovered && (
          <span className="ml-2 font-semibold">GetAI</span>
        )}
      </Button>
    </div>
  );
}

export default AIButton;
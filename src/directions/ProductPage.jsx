import { useLocation } from 'react-router-dom';

export default function ProductPage() {
  const location = useLocation();
  const data = location.state; // Access the passed data

  return (
    <div>
        
    </div>
  );
};
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <div className="h-10 border-b border-gray-300">
        <div className="text-2xl text-left ml-5">
          <div className='flex w-screen'>
            <Link href="/">
              SimpleAnnotation
            </Link>
          </div>
        </div>
    </div>
  );
};
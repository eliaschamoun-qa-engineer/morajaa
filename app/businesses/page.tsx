import { carDealers, realEstate } from '../../data/businesses'; // Adjusted import path
import { StarIcon, BuildingOffice2Icon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Helper function to generate slug from business name
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function BusinessesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            مراجعة
          </Link>
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
              الرئيسية
            </Link>
          </nav>
          <div>
            <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              أضف تقييمك 
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            دليل الشركات
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تصفح قائمة المطورين العقاريين وتجار السيارات. انقر على اسم الشركة لعرض التقييمات والمراجعات.
          </p>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Real Estate Category */}
          <section>
            <div className="flex items-center mb-6">
              <BuildingOffice2Icon className="h-8 w-8 text-blue-600 ms-3" />
              <h2 className="text-3xl font-bold text-gray-800">
                شركات ومطورون عقاريون
              </h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ul className="space-y-4">
                {realEstate.map(({ en, ar }) => (
                  <li key={en}>
                    <Link 
                      href={`/businesses/${generateSlug(en)}`}
                      className="flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600">{ar}</span>
                      <span className="text-sm text-gray-500 ms-2">({en})</span>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="me-2"> (3 تقييمات)</span>
                        <div className="flex text-yellow-400">
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5 text-gray-300" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Car Dealers Category */}
          <section>
            <div className="flex items-center mb-6">
              <RocketLaunchIcon className="h-8 w-8 text-green-600 ms-3" />
              <h2 className="text-3xl font-bold text-gray-800">
                وكالات وتجار السيارات
              </h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ul className="space-y-4">
                {carDealers.map(({ en, ar }) => (
                  <li key={en}>
                    <Link 
                      href={`/businesses/${generateSlug(en)}`}
                      className="flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <span className="text-lg font-bold text-gray-800 group-hover:text-green-600">{ar}</span>
                      <span className="text-sm text-gray-500 ms-2">({en})</span>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="me-2"> (5 تقييمات)</span>
                        <div className="flex text-yellow-400">
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
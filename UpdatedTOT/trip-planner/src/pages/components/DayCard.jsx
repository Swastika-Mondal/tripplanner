import { MapPin, Clock, Camera } from 'lucide-react';
import ImageGallery from './ImageGallery';
import Map from './Map';

export default function DayCard({ day, index }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e6b17e]/20">
        <div className="p-6">
          <div className="rounded-xl overflow-hidden">
            <Map places={day.Places} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {day.Places.map((place, placeIndex) => (
          <div 
            key={place.visit_place} 
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e6b17e]/20"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#2c1810] text-white flex items-center justify-center text-xl font-semibold flex-shrink-0">
                  {placeIndex + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c1810] mb-2">
                    {place.visit_place}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#e6b17e]" />
                      <span>{place.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#e6b17e]" />
                      <span>{place.loc}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{place.description}</p>
              <div className="rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 text-[#2c1810] mb-4">
                  <Camera className="w-5 h-5" />
                  <span className="font-medium">Photo Gallery</span>
                </div>
                <ImageGallery images={place.Images} title={place.visit_place} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

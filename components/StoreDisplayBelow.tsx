import Image from "next/image";

export default function StoreDisplayBelow() {
  // Example images, replace with your own
  const displays = [
    {
      src: "/placeholder.jpg",
      alt: "Display 1",
    },
    {
      src: "/placeholder.jpg",
      alt: "Display 2",
    },
    {
      src: "/placeholder.jpg",
      alt: "Display 3",
    },
  ];

  return (
    <div className="flex justify-center items-center mx-auto  max-w-7xl px-4 bg-[#efefef] py-1">
      <div
        className="grid grid-cols-3 gap-6 w-full"
        style={{ gridTemplateColumns: "25% 35% 35%" }}
      >
        {displays.map((display, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow flex items-center justify-center h-40 overflow-hidden"
          >
            <Image
              src={display.src}
              alt={display.alt}
              width={300}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

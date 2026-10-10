import { Camera, Heart, MessageCircle } from "lucide-react";

const SocialFeed = ({ config, onOpenLightbox }) => {
  const handle = config.instagramHandle || "olamide_efemena";

  return (
    <section class="py-16 text-center bg-stone-50/50 fade show">
      <div class="max-w-4xl mx-auto px-6">
        <span class="font-alex text-amber-600 text-3xl block mb-2 font-semibold">
          From Our Socials
        </span>
        <h2
          class="text-3xl font-cormorant font-bold text-stone-800 mb-8"
          id="socialTitle"
        >
          @{handle} on Instagram
        </h2>

        {/* LightWidget Container */}
        {config.lightwidgetId ? (
          <div
            id="lightwidgetContainer"
            class="rounded-3xl overflow-hidden shadow-sm border border-stone-200/50 bg-white p-2 mb-8"
          >
            <iframe
              id="lightwidgetIframe"
              src={`https://lightwidget.com/widgets/${config.lightwidgetId}.html`}
              style={{
                width: "100%",
                border: 0,
                height: "450px",
                borderRadius: "20px",
              }}
            ></iframe>
          </div>
        ) : (
          /* Fallback Beautiful Polaroid Grid */
          <div
            id="socialFallbackGrid"
            class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {config.socialPhotos.map((item, idx) => (
              <div
                key={idx}
                class="relative group overflow-hidden rounded-2xl aspect-square shadow-sm bg-stone-100 cursor-pointer"
                onClick={() => onOpenLightbox(item.src)}
              >
                <img
                  src={item.src}
                  alt="Social Photo"
                  class="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-6 text-white font-medium text-sm">
                  <span class="flex items-center gap-1">
                    <Heart size={16} fill="currentColor" /> {item.likes}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle size={16} fill="currentColor" />{" "}
                    {item.comments}
                  </span>
                </div>
                <div class="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[9px] uppercase font-semibold tracking-wider z-10">
                  Live
                </div>
              </div>
            ))}
          </div>
        )}

        <div class="text-center mt-6">
          <a
            id="instagramLink"
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-amber-500/30 text-amber-600 text-xs font-semibold uppercase hover:bg-amber-500 hover:text-white transition duration-300"
          >
            <Camera size={16} /> Follow Our Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;

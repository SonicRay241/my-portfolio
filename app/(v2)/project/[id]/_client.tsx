import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { showcases } from "@/libs/showcasemeta";
import CaseStudy from "./_caseStudy";
import LazyImage from "@/components/v2/lazyimage";
import LazyVideo from "@/components/v2/lazyvideo";

export default function ClientPage(props: {
  projectId: string
}) {
  const metadata = showcases[props.projectId];

  return (
    <div className="text-zinc-100 px-4 pt-4 md:pt-6 md:px-6 text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">
      {metadata.bannerType == "video" ? (
        <LazyVideo
          className="w-full min-h-[20vh]"
          src={metadata.bannerUrl ? metadata.bannerUrl : `${metadata.path}/banner.mp4`}
          controls={false}
          playsInline
          loop
          muted
          autoPlay
          disablePictureInPicture
          loadingText="Loading banner..."
          preload="auto"
          initLoad
        />
      )
        : (
          <LazyImage
            className="w-full min-h-[20vh]"
            src={`${metadata.path}/banner.jpg`}
            alt={`${metadata.name} banner`}
            loadingText="Loading banner..."
            initLoad
          />
        )
      }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-6 items-stretch">
        <div>
          <div className="md:sticky top-6">
            <h1>{metadata.name}</h1>
            <p className="text-zinc-500">{metadata.description}</p>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>{metadata.details?.firstHalf}</p>
            <p>{metadata.details?.secondHalf}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {metadata.role && (
              <>
                <div className="">
                  <p className="text-zinc-500">Role</p>
                  <p>{metadata.role}</p>
                </div>
              </>
            )}
            {metadata.collaborators && (
              <>
                <div className="">
                  <p className="text-zinc-500">
                    Collaborator{metadata.collaborators.length > 1 && "s"}
                  </p>
                  {metadata.collaborators.map((v, k) => (
                    <p key={k}>{v}</p>
                  ))}
                </div>
              </>
            )}
            {metadata.duration && (
              <>
                <div className="">
                  <p className="text-zinc-500">Duration</p>
                  <p>{renderDuration(metadata.duration)}</p>
                </div>
              </>
            )}
            {metadata.tools && (
              <>
                <div className="">
                  <p className="text-zinc-500">
                    Tool{metadata.tools.length > 1 && "s"}
                  </p>
                  {metadata.tools.map((v, k) => {
                    if (Array.isArray(v)) {
                      return (
                        <a className="flex items-center gap-2 hover:text-violet-600 transition-colors" target="_blank" href={v[1]} key={k}>
                          <span>{v[0]}</span>
                          <ArrowOutwardIcon fontSize="small" />
                        </a>
                      )
                    }
                    return <p key={k}>{v}</p>
                  })}
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {metadata.links &&
              metadata.links.map((v, k) => <Link key={k} {...v} />)}
          </div>
          {metadata.caseStudy && (
            <CaseStudy
              mdUrl={`${metadata.path}/case-study.md`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Link(props: { name: string; url: string }) {
  return (
    <a
      className="p-4 flex flex-nowrap justify-between items-center bg-zinc-800 text-zinc-500 rounded-lg transition-colors hover:bg-violet-600 hover:text-zinc-100"
      href={props.url}
      target="_blank"
    >
      <span>{props.name}</span>
      <ArrowOutwardIcon fontSize="small" />
    </a>
  );
}

function renderDuration(duration: { start: Date; end: Date }) {
  if (duration.start.getFullYear() == duration.end.getFullYear()) {
    return `${duration.start.toLocaleString("default", {
      month: "long",
    })} - ${duration.end.toLocaleString("default", {
      month: "long",
    })} ${duration.end.toLocaleString("default", { year: "numeric" })}`;
  }
}

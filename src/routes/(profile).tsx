import { A, createAsync, RouteSectionProps } from "@solidjs/router";
import { For, Suspense } from "solid-js";
// @ts-ignore
import Avatar from "~/assets/images/avatar.jpg?h=480;240;120"
import Image from "~/components/Image";
import { getPages } from "~/apis/pages";
import SvgBrandGithub from "@tabler/icons/outline/brand-github.svg"

export default function ProfileLayout(props: RouteSectionProps) {
  const fetchPages = createAsync(() => getPages());

  const pages = fetchPages();
  const pagesLength = pages?.length || 0;

  return (
    <div>
      <div class="container flex flex-col max-w-lg sm:max-w-3xl">
        <div class="flex mx-auto px-3 sm:px-6 py-6 sm:py-12 justify-center">
          <div class="flex-shrink-0 flex items-center">
            <Image class="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full shadow my-auto" src={Avatar}
                   baseSize={120} alt={"Avatar"} />
          </div>
          <div class="ml-6 flex flex-col justify-center">
            <div class="flex flex-col sm:flex-row sm:space-x-2 items-baseline">
              <div class="leading-tight text-strong rn">
                <span class="text-2xl sm:text-3xl md:text-4xl font-semibold">Yvette-Yuefan Wu</span>
              </div>
              <div class="font-normal text-xl sm:text-2xl md:text-3xl text-strong leading-tight pb-1 rn">
                <span class="text-label2 pr-2">(she/they)</span>
              </div>
            </div>
            <div class="text-sm sm:text-base md:text-lg text-label whitespace-nowrap">
                I do philosophy and other interesting stuffs.
            </div>
            <div class="text-lg md:text-xl text-label leading-tight md:leading-normal mt-2">
              <For each={pages}>
                {([path, {name}], i) => (
                  <>
                    <A activeClass="link-selected" inactiveClass="link" end={true} href={path}>{name}</A>
                    {i() !== pagesLength - 1 && <span class="mx-1">|</span>}
                  </>
                )}
              </For>
            </div>
          </div>
        </div>
        <div class="flex flex-col mb-auto px-6 sm:px-12 pt-3 pb-6">
          <div class="markdown">
            <Suspense>
              {props.children}
            </Suspense>
          </div>
          <div class="mt-8 max-w-3xl text-xs md:text-sm text-label text-center flex flex-col sm:flex-row">
            <p class="sm:mr-auto">
              © Yvette-Yuefan Wu {import.meta.env.VITE_LAST_UPDATE_YEAR}.
              Site template by <a class="text-accent inline-block" href="https://github.com/PhotonQuantum/landingpage">
              <SvgBrandGithub class="w-4 h-4 inline-block align-text-bottom" />
	      LightQuantum
            </a>.&nbsp;
            </p>
            <p>
              Last updated on {import.meta.env.VITE_LAST_UPDATE}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Law12 from '../../assets/website/about2minadef.jpeg';

function About() {
    return (
        <section id="about">
            <h2
                data-aos="fade-up"
                className=" text-center text-3xl underline underline-offset-4">About us</h2>
            <main className="bg-slate-100 dark:bg-slate-900 dark:text-white">

                <section className="container flex flex-col items-center justify-center py-10 md:h-[500px] ">

                    <div className="grid grid-cols-1 items-center gap-4  md:grid-cols-2">
                        <div
                            data-aos="fade-right"

                        >
                            <img
                                src={Law12}
                                alt="No image"
                                className="max-auto w-full hover:drop-shadow-md"
                            />
                        </div>
                        <div

                            data-aos="fade-left"
                            // data-aos-duration="400"
                            // data-aos-once="true"
                            className="flex flex-col items-start gap-4 text-left md:items-start md:p-8 md:text-left "

                        >
                            {/* <h1 className="text-xl md:text-xl ">
                                Empowe Africa Now develops and maintains its products and services to be enterprise grade.
                            </h1> */}
                            <h2 className=" text-2xl">MOD</h2>
                            <p className="text-sm  dark:text-slate-400">
                                The overall goal of the Ministry of Defence is to generate,
                                employ and sustain combat-ready, integrated and rapidly deployable
                                Defence Force, capable of quick assemblage to meet varying contingencies
                                both at home and abroad.
                            </p>
                            <div>
                                <h2 className=" text-2xl">Vision</h2>
                                <p className="text-sm  dark:text-slate-400">
                                    The mission of the Ministry of Defence is the conduct of defence
                                    in terms of protecting Rwanda’s interests, territorial integrity,
                                    vital resources, her people and shared values under the ambit of
                                    the Constitution and International Law.
                                </p>
                            </div>
                            <div>

                                <p className="text-sm  dark:text-slate-400">
                                    Determining the extent to which the nation’s strategic
                                    interests may be defended especially when it involves possible
                                    employment of the Defence Force, and advise government accordingly;
                                </p>
                                <h2 className=" text-2xl">Mission</h2>
                                <p className="text-sm  dark:text-slate-400">
                                    Participating in building and maintaining trust
                                    amongst other nations. The MoD seeks to implement
                                    this through defence diplomacy, and to play an effective
                                    role in support of regional and international organizations.
                                </p>
                            </div>
                            {/* <div className="space-x-4">
                                <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                                    Get Started
                                </button>
                            </div> */}
                        </div>

                    </div>
                </section>
            </main>
        </section>
    )
}

export default About

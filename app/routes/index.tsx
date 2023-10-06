import Banner from "~/components/Banner";
// import projects from "~/assets/data/projects";
import { json } from "@remix-run/node";
import noImage from "~/assets/images/no-image.png";
import { useLoaderData } from "@remix-run/react";

const ProjectCard = ({ project }) => {
  const imageURL = ""
  console.log(project.image)
	return (
		<div className=" shadow-xl h-[600px] flex flex-col rounded-md overflow-hidden">
			<img
				className=" h-56 object-cover object-center"
				src={imageURL || noImage}
				alt=""
			/>

			<div className=" p-2 flex flex-col gap-3 flex-1">
				<h2 className="text-xl font-medium"> {project.title} </h2>
				<div className=" text-gray-700 flex-1">
					{project.description}
				</div>
				<div className=" grid grid-cols-4 gap-3">
					{project.tags.map((tag: String, i: Number) => (
						<div
							key={i}
							className=" bg-slate-200 w-24 text-sm text-center rounded-xl p-y-1.5"
						>
							{tag}
						</div>
					))}
				</div>
				{project.link ? (
					<a
						href={project.link}
						className="text-primary rounded-sm border-2 text-center p-2 border-accent hover:bg-accent duration-200 justify-self-end"
					>
						Visit Project
					</a>
				) : (
					<div className=" text-gray-400 rounded-sm border-2 text-center p-2 duration-200 justify-self-end">
						No Link
					</div>
				)}
			</div>
		</div>
	);
};

export async function loader() {
  const PROJECT_ID = "nx27apid"
  const DATASET = "production"
  const QUERY = encodeURIComponent('*[_type == "project"]')

  const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`
  const res = await fetch(URL)
  return json(await res.json())
}

export default function Index() {
  const { result } = useLoaderData<typeof loader>();
  console.log(result)
	return (
		<div className=" pb-40">
			<Banner />

			<section id="projects" className=" min-h-screen flex justify-center">
				<div className="md:max-w-4xl xl:max-w-7xl w-full">
					<h1 className=" text-center text-3xl text-primary font-medium mt-5">
						Projects
					</h1>
					<div className=" grid md:grid-cols-2 xl:grid-cols-3 mt-10 gap-5 columns-3">
						{result.map((project, i) => (
							<ProjectCard key={i} project={project} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

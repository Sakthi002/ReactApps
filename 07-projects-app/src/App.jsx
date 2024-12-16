import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });
  
  const handleStartAddProject = () => {
  
    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: null
      }
    })
  }

  const handleAddproject = (project) => {

    const projectId = Math.random();
    const newProject = {
      ...project,
      id: projectId
    }

    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject]
      }
    })
  }
  
  const handleCancelAddProject = () => {
  
    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined
      }
    })
  }

  const handleSelectProject = (id) => {

    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: id
      }
    })
  }

  const handleDeleteProject = (id) => {

    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        projects: prevProjectState.projects.filter(project => project.id !== prevProjectState.selectedProjectId),
        selectedProjectId: undefined
      }
    })
  }

  const handleAddTask = (text) => {
    
    const taskId = Math.random();
    const newTask = {
      text: text,
      id: taskId,
      projectId: projectsState.selectedProjectId
    }

    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        tasks: [newTask, ...prevProjectState.tasks]
      }
    })
  }

  const handleDeleteTask = (id) => {

    setProjectsState(prevProjectState => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter(task => task.id !== id)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}
    onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} projectTasks={projectsState.tasks}>

  </SelectedProject>;
  
  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddproject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelect={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}/>

      {content}
    </main>
  );
}

export default App;

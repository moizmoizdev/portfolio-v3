import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { usePageTitle } from '../../../context/PageTitleContext';
import projectsService from '../../../services/projectsService';
import './Projects.css';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <Paper className="project-card" elevation={2}>
      <div className="project-image-container">
        <img src={project.imageUrl || `/assets/project-placeholder.jpg`} alt={project.title} className="project-image" />
      </div>
      <div className="project-content">
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" className="project-title">
            {project.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(project)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(project)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" className="project-description">
          {project.description}
        </Typography>
        <div className="project-tech">
          {project.technologies && Array.isArray(project.technologies) ? (
            project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))
          ) : (
            <span className="tech-tag">No technologies listed</span>
          )}
        </div>
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <GitHubIcon fontSize="small" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <LaunchIcon fontSize="small" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </Paper>
  );
};

const Projects = () => {
  const { pageTitle } = usePageTitle();
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // CRUD state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: ''
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Open dialog for adding new project
  const handleAddNew = () => {
    setDialogMode('add');
    setFormData({
      title: '',
      description: '',
      technologies: '',
      imageUrl: '',
      githubUrl: '',
      liveUrl: ''
    });
    setOpenDialog(true);
  };
  
  // Open dialog for editing project
  const handleEdit = (item) => {
    setDialogMode('edit');
    setCurrentItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      technologies: item.technologies && Array.isArray(item.technologies) 
        ? item.technologies.join(', ') 
        : '',
      imageUrl: item.imageUrl || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || ''
    });
    setOpenDialog(true);
  };
  
  // Open delete confirmation
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const technologiesArray = formData.technologies
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
        
      const submissionData = {
        ...formData,
        technologies: technologiesArray
      };
      
      if (dialogMode === 'add') {
        const newItem = await projectsService.create(submissionData);
        setProjectsData([...projectsData, newItem]);
        setSnackbar({
          open: true,
          message: 'Project added successfully!',
          severity: 'success'
        });
      } else {
        const updatedItem = await projectsService.update(currentItem._id, submissionData);
        setProjectsData(projectsData.map(item => 
          item._id === currentItem._id ? updatedItem : item
        ));
        setSnackbar({
          open: true,
          message: 'Project updated successfully!',
          severity: 'success'
        });
      }
      
      setOpenDialog(false);
    } catch (err) {
      console.error('Error saving project:', err);
      setSnackbar({
        open: true,
        message: `Failed to ${dialogMode === 'add' ? 'add' : 'update'} project. ${err.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      await projectsService.delete(itemToDelete._id);
      setProjectsData(projectsData.filter(item => item._id !== itemToDelete._id));
      setSnackbar({
        open: true,
        message: 'Project deleted successfully!',
        severity: 'success'
      });
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Error deleting project:', err);
      setSnackbar({
        open: true,
        message: `Failed to delete project. ${err.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbar({...snackbar, open: false});
  };
  
  useEffect(() => {
    // Fetch projects data when component mounts
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Starting projects data fetch...');
        const data = await projectsService.getAll();
        console.log('Projects data received from service:', data);
        
        // Check if data is valid
        if (!data || !Array.isArray(data)) {
          console.error('Received invalid projects data format:', data);
          setError('Received invalid data format from API. Using fallback data.');
          setProjectsData([]);
          return;
        }
        
        if (data.length === 0) {
          console.log('API returned empty array, using fallback projects data');
        } else {
          setProjectsData(data);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects data:', err);
        let errorMessage = 'Failed to load projects data. ';
        
        if (err.message) {
          errorMessage += err.message;
        } else {
          errorMessage += 'Please try again later.';
        }
        
        setError(errorMessage);
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Add a retry function
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        console.log('Retrying projects data fetch...');
        const data = await projectsService.getAll();
        console.log('Retry projects data received:', data);
        
        if (!data || !Array.isArray(data)) {
          console.error('Retry received invalid projects data format:', data);
          setError('Received invalid data format from API. Using fallback data.');
          setProjectsData([]);
          return;
        }
        
        if (data.length > 0) {
          setProjectsData(data);
          setError(null);
        } else {
          setError('API returned empty data. Using fallback data.');
        }
      } catch (err) {
        console.error('Retry failed:', err);
        setError(`Retry failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  };
  
  // Fallback data in case API is not available
  const fallbackProjects = [
    {
      _id: "1",
      title: "CelestialChain",
      description: "A blockchain implementation with consensus protocol and transaction processing capabilities.",
      imageUrl: "/assets/blockchain.jpg",
      technologies: ["OpenSSL", "Boost", "levelDB"],
      githubUrl: "https://github.com/moizmoizdev/CelestialChain",
      liveUrl: ""
    },
    {
      _id: "2",
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my projects and skills with a modern UI design.",
      imageUrl: "/assets/portfolio.jpg",
      technologies: ["React", "Material UI", "CSS", "Javascript"],
      githubUrl: "https://github.com/moizmoizdev/portfolio-v2",
      liveUrl: "https://moizmoiz.com"
    }
  ];

  // Use API data if available, otherwise fallback to hardcoded data
  const projects = projectsData.length > 0 ? projectsData : fallbackProjects;

  return (
    <Box className="projects-section">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2" className="section-title" gutterBottom>
            {pageTitle}
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add Project
          </Button>
        </Box>
        
        <Typography variant="body1" className="section-subtitle" paragraph>
          Here are some of the projects I've worked on. Each project has helped me develop my skills and learn new technologies.
        </Typography>

        {loading && !openDialog && !deleteConfirmOpen ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box className="error-message" textAlign="center" my={4}>
            <Typography color="error">{error}</Typography>
            <Button onClick={handleRetry} variant="contained" color="primary" sx={{ mt: 2 }}>
              Retry
            </Button>
          </Box>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
        
        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{dialogMode === 'add' ? 'Add New Project' : 'Edit Project'}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Project Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="technologies"
                    label="Technologies (comma separated)"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    helperText="E.g. React, Node.js, MongoDB"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="imageUrl"
                    label="Image URL"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    helperText="URL to project screenshot or image"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="githubUrl"
                    label="GitHub URL"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="liveUrl"
                    label="Live Demo URL"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {dialogMode === 'add' ? 'Add' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the project "{itemToDelete?.title}"?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Projects; 
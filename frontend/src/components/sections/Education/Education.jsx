import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { usePageTitle } from '../../../context/PageTitleContext';
import educationService from '../../../services/educationService';
import './Education.css';

function Education() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { pageTitle } = usePageTitle();
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // CRUD state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    school: '',
    location: '',
    years: '',
    about: '',
    highlights: ''
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
  
  // Open dialog for adding new education
  const handleAddNew = () => {
    setDialogMode('add');
    setFormData({
      degree: '',
      school: '',
      location: '',
      years: '',
      about: '',
      highlights: ''
    });
    setOpenDialog(true);
  };
  
  // Open dialog for editing education
  const handleEdit = (item) => {
    setDialogMode('edit');
    setCurrentItem(item);
    setFormData({
      degree: item.degree,
      school: item.school,
      location: item.location,
      years: item.years,
      about: item.about,
      highlights: item.highlights.join('\n')
    });
    setOpenDialog(true);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Clean all input values and remove any tab characters or extra whitespace
      const cleanedFormData = {
        degree: formData.degree.trim(),
        school: formData.school.trim(),
        location: formData.location.trim(),
        years: formData.years.trim(),
        about: formData.about.trim(),
        highlights: formData.highlights
          .split('\n')
          .map(item => item.trim())
          .filter(item => item !== '')
      };
      
      console.log('Cleaned data for submission:', cleanedFormData);
      
      if (dialogMode === 'add') {
        const newItem = await educationService.create(cleanedFormData);
        setEducationData([...educationData, newItem]);
        setSnackbar({
          open: true,
          message: 'Education added successfully!',
          severity: 'success'
        });
      } else {
        console.log('Updating with ID:', currentItem._id);
        
        const updatedItem = await educationService.update(currentItem._id, cleanedFormData);
        setEducationData(educationData.map(item => 
          item._id === currentItem._id ? updatedItem : item
        ));
        setSnackbar({
          open: true,
          message: 'Education updated successfully!',
          severity: 'success'
        });
      }
      
      setOpenDialog(false);
    } catch (err) {
      console.error('Error saving education:', err);
      console.error('Error details:', err.response?.data || 'No additional error details');
      
      // Show more specific error message if available
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
      setSnackbar({
        open: true,
        message: `Failed to ${dialogMode === 'add' ? 'add' : 'update'} education. ${errorMessage}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Open delete confirmation
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };
  
  // Handle deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      await educationService.delete(itemToDelete._id);
      setEducationData(educationData.filter(item => item._id !== itemToDelete._id));
      setSnackbar({
        open: true,
        message: 'Education deleted successfully!',
        severity: 'success'
      });
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Error deleting education:', err);
      setSnackbar({
        open: true,
        message: `Failed to delete education. ${err.message}`,
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
    // Fetch education data when component mounts
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await educationService.getAll();
        console.log('Data received from service:', data);
        setEducationData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch education data:', err);
        setError('Failed to load education data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fallback data in case API is not available
  const fallbackData = [
    {
      _id: "1",
      degree: "Bachelor in Computer Science",
      school: "Information Technology University Lahore",
      location: "Lahore, Pakistan",
      years: "2023 - 2027",
      about: "Currently pursuing a degree in Computer Science with focus on software development.",
      highlights: [
        "CGPA: 3.53/4.0",
        "Been developeing interesting and innovative projects"    
      ]
    },
    {
      _id: "2",
      degree: "Intermediate (Pre-Engineering)",
      school: "F.G Public School",
      location: "Pakistan",
      years: "2021 - 2023",
      about: "Completed pre-engineering program with focus on mathematics and physics.",
      highlights: [
        "Percentage: 83%",
        "Participated in science competitions",
        "Chief Prefect responsible for discipline and conduct of the school, managed dozens ns of prefects"
      ]
    },
    {
      _id: "3",
      degree: "Matriculation (Science)",
      school: "F.G Public School",
      location: "Pakistan",
      years: "2019 - 2021",
      about: "Completed matriculation with science subjects.",
      highlights: [
        "Percentage: 87.5%",
        "Top performer in Science subjects",
      ]
    }
  ];

  // Use API data if available, otherwise fallback to hardcoded data
  const schoolInfo = educationData.length > 0 ? educationData : fallbackData;

  const renderMobileView = () => {
    return (
      <Box className="mobile-education">
        {schoolInfo.map((item, index) => (
          <Card key={item._id} className={index % 2 === 0 ? 'light-card' : 'dark-card'}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h6" className="degree-cell">
                  {item.degree}
              </Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEdit(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(item)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography variant="body2" className="school-text">
                {item.school} • {item.location}
              </Typography>
              
              <Typography variant="body2" className="year-text">
                {item.years}
              </Typography>
              
              <Typography variant="body2" className="details-text">
                {item.about}
              </Typography>
              
              <Typography variant="subtitle2" className="highlights-title">
                Highlights:
              </Typography>
              
              <List dense className="highlights-list-mobile">
                {item.highlights.map((point, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  const renderTableView = () => {
    return (
      <TableContainer component={Paper} className="education-table">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell><SchoolIcon className="table-icon" /> Degree</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Years</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>About</TableCell>
              <TableCell>Highlights</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schoolInfo.map((item, index) => (
              <TableRow 
                key={item._id} 
                className={index % 2 === 0 ? 'light-row' : 'dark-row'}
              >
                <TableCell className="degree-cell">{item.degree}</TableCell>
                <TableCell>{item.school}</TableCell>
                <TableCell>{item.years}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.about}</TableCell>
                <TableCell>
                  <ul className="highlights-list">
                    {item.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(item)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box className="education-section">
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
            Add Education
          </Button>
        </Box>
        
        <Typography variant="body1" className="section-subtitle" paragraph>
          My academic journey in the field of Computer Science.
        </Typography>

        {loading && !openDialog && !deleteConfirmOpen ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box className="error-message" textAlign="center" my={4}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          isMobile ? renderMobileView() : renderTableView()
        )}
        
        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{dialogMode === 'add' ? 'Add New Education' : 'Edit Education'}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="degree"
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="school"
                label="School"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="years"
                label="Years (e.g. 2021-2025)"
                name="years"
                value={formData.years}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="about"
                label="About"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="highlights"
                label="Highlights (one per line)"
                name="highlights"
                value={formData.highlights}
                onChange={handleInputChange}
                multiline
                rows={4}
                helperText="Enter each highlight on a new line"
              />
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
              Are you sure you want to delete the education entry "{itemToDelete?.degree}"?
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
}

export default Education; 
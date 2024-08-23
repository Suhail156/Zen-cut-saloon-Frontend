import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/users/userview/${id}`
        );
        const user = response.data.data;
        setFormData({
          username: user.username,
          phone: user.phone,
          email: user.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${baseUrl}/api/users/useredit/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #E0E5EC, #C4C9D4)",
        p: 2,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 600, borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 4, textAlign: "center", fontWeight: 600 }}
          >
            Edit Profile
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
            >
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(`/profile/${id}`)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;

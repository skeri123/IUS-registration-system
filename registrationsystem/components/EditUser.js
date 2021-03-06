import {
  Button,
  Checkbox,
  CircularProgress,
  createStyles,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CardBody from "./Card/CardBody";
import CardHeader from "./Card/CardHeader";
import Card from "./Card/Card.js";
import { useForm } from "react-hook-form";
import { useCreateUser, useGetUser } from "../services/userService";
import { useMutation } from "react-query";
import { httpClient } from "../utilities/httpClient";
import { useRouter } from "next/router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      width: "90%",
      top: "5%",
      left: "50%",
      marginBottom: "3%",
      transform: "translate(-50%)",
      overflowY: "auto",
    },
  })
);

function EditUser(props) {
  const classes = useStyles();
  const router = useRouter();
  console.log(router.query);
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const { register, handleSubmit } = useForm();
  // const [mutate, { data, error }] = useCreateUser();
  const { data: editedUser, status, refetch } = useGetUser(router.query.id);
  const mutation = useMutation((userData) =>
    httpClient.put(`/users/${router.query.id}`, userData)
  );

  if (status !== "success" && editedUser === undefined) {
    return (
      <CircularProgress
        style={{ position: "relative", left: "50%", top: "50%" }}
      />
    );
  }

  function renderedSwitch() {
    if (faculty === "FENS") {
      return (
        <Select name="program" inputRef={register} onChange={handleChangeP}>
          <MenuItem value="CS">CS</MenuItem>
          <MenuItem value="SE">SE</MenuItem>
          <MenuItem value="ARCH">ARCH</MenuItem>
          <MenuItem value="BIO">BIO</MenuItem>
        </Select>
      );
    } else if (faculty === "FASS") {
      return (
        <Select name="program" inputRef={register} onChange={handleChangeP}>
          <MenuItem value="PSY">PSY</MenuItem>
          <MenuItem value="PS">PS</MenuItem>
          <MenuItem value="VAS">VAS</MenuItem>
          <MenuItem value="EN">EN</MenuItem>
        </Select>
      );
    } else if (faculty === "FBA") {
      return (
        <Select name="program" inputRef={register} onChange={handleChangeP}>
          <MenuItem value="IR">IR</MenuItem>
          <MenuItem value="IBF">IBF</MenuItem>
          <MenuItem value="ECO">ECO</MenuItem>
        </Select>
      );
    }
  }

  const handleChange = (event) => {
    setFaculty(event.target.value);
  };
  const handleChangeP = (event) => {
    setProgram(event.target.value);
  };

  const onSubmit = (data) => {
    const someone = {
      name: data.firstName,
      surname: data.lastName,
      email: data.email,
      userID: data.id,
      //password: data.password,
      faculty: faculty,
      program: program,
      isAdmin: data.admin,
      isSAO: data.sao,
      paid: data.paid,
      isApproved: false,
    };
    console.log(someone);
    // await mutate(someone);
    mutation.mutate(someone);

    router.push("/admin/users");
  };

  return (
    <Card>
      <CssBaseline />
      <CardHeader color="info">
        <Typography variant="h5" align="center" gutterBottom>
          Edit {editedUser.data.name}
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            className={classes.root}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                name="firstName"
                defaultValue={editedUser.data.name}
                type="text"
                label="First Name"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                defaultValue={editedUser.data.surname}
                name="lastName"
                type="text"
                label="Last Name"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                defaultValue={editedUser.data.email}
                fullWidth
                required
                type="email"
                label="Email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="id"
                defaultValue={editedUser.data.userID}
                fullWidth
                required
                type="ID"
                label="ID"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Select faculty</InputLabel>
                <Select name="faculty" onChange={handleChange}>
                  <MenuItem value="FENS">FENS</MenuItem>
                  <MenuItem value="FBA">FBA</MenuItem>
                  <MenuItem value="FASS">FASS</MenuItem>
                  <MenuItem value="FE">FE</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select program</InputLabel>
                {renderedSwitch()}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Other</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    label="Paid"
                    control={
                      <Checkbox
                        name="paid"
                        type="checkbox"
                        value={true}
                        inputRef={register}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Admin"
                    control={
                      <Checkbox
                        name="admin"
                        type="checkbox"
                        value={true}
                        inputRef={register}
                      />
                    }
                  />
                  <FormControlLabel
                    label="SAO"
                    control={
                      <Checkbox
                        name="sao"
                        type="checkbox"
                        value={true}
                        inputRef={register}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardBody>
    </Card>
  );
}
export default EditUser;

# Bomb Risk Elicitation Task (Crosetto & Filippin, 2013) - ReactJS

## Overview
This task was used in the paper titled "The risk is in the eye of the beholder: Risk preferences and attention in finance" (M. Borozan, A. Chaigneau, G. Pezzulo, P. Saccord, R. Palumbo, P. Iodice) and was adapted from Crosetto & Filippin, 2013.

**Crosetto, P., Filippin, A. The “bomb” risk elicitation task. J Risk Uncertain 47, 31–65 (2013). https://doi.org/10.1007/s11166-013-9170-z**

## Details
This task is a financial lottery game that is characterized by its simplicity and minimal numerical requirements, effectively balancing the need for precision with user-friendly comprehension. We developed a custom version of the task for implementation in our software ([full task](https://github.com/AmineChaigneau/Financial-task-mt)). Briefly, participants are presented with a series of n closed boxes (n = 64 by default) and decide how many boxes to open, each one containing a fixed amount of money.

Importantly, there is a bomb hidden in one of the boxes. If the participant collects the bomb, they receive nothing, otherwise they win the amount of money determined by the number of
boxes collected. Therefore, participants’ task is to decide how many boxes they wanted to open and thus how much risk they are willing to assume.

## How to Use this Repository

This project is not in production. To try it or use it, please run it in developpement mode. 

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

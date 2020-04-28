# Virographs by MarshmallowFlush

## Roster

- **Elizabeth Doss** (PM):
  - Oversees project development
  - Help with frontend/backend development
  - Updates devlog, design doc, and README
- **Amanda Chen**
  - Create animated graphs using D3 and gathered data
  - Javascript
- **Lauren Pehlivanian**
  - Work on front-end CSS/Bootstrap to make website visually appealing
  - Processes CSV and JSON files into usable format
  - Python/Flask
- **Kiran Vuksanaj**
  - Create interactive COVID-19 simulation using svg/canvas
  - Javascript

## Description
Our project is a site that models changing COVID-19 data. Users will be able to compare trends of Coronavirus statistics between different countries and different US states. Users will also be able to see the effects of social distancing and quarantine on the spread of the virus.

## APIS
[Coronavirus COVID19 API](https://docs.google.com/document/d/1wE1gsPy3Cwb9_m6-UFHCaxGMWBLXaZmIMp1nVmpA2Wg/edit)
This API provides information about today's confirmed cases, deaths, and recoveries of coronavirus by country and as a global total. It also provides the past data of individual countries. We will be using this API to update the global count feature on our site daily.

## Launch Instuctions

### Assuming python3 and pip are already installed

### Clone

Clone the repository and enter the cloned folder by running the following commands in your terminal:

```shell
git clone https://github.com/edoss00/MarshmallowFlush.git

cd MarshmallowFlush/
```

### Virtual Environment

Set up a virtual environment by running the following in your terminal:

```shell
python -m venv hero
# replace hero with name of venv
```

To enter your virtual environment, run:

```shell
. hero/bin/activate
```

### Dependencies

Install the required modules/libraries by running the following in your virtual environment:

```shell
pip install -r requirements.txt
```

### Run

To run the program run the following in your virtual environment:

```shell
python3 __init__.py
```
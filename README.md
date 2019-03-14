# clean-ue4
Simple npm script to clean Intermediate, Saved folders, and .pdbs from unreal projects and plugins for release preparation.

## Setup
1. Install [nodejs](https://nodejs.org/en/download/)
2. Navigate to ue4 project of choice and open a powershell window there
3. ```git clone https://github.com/getnamo/clean-ue4.git```
4. ```npm i```
5. ```node clean``` this will give you usage instructions

## Usage

Format is

```node clean --p <path>``` where path should only be ```../```

You'll need one of the following options

#### Options
```-i``` for intermediate folders
```-s``` for saved folder
```-b``` for *.pdb files

e.g. for everything

```node clean --p ../ -i -s -b```

You'll be prompted to confirm the delete patterns with a ```y``` or ```n```.

#### Other Options
##### Dry Run
To see what would've gotten deleted without doing it add ```-d``` which stands for dry run.

##### Auto-confirm
To auto-confirm delete prompt use ```-y```

##### Unrestricted project path
If you want to redirect script to another path you need to add ```-u``` to add unrestricted path mode (not recommended).

##### Lazy mode
If you're comfortable with the files it deletes

do
```node clean -x```

I would recommend doing a dry run first...

```node clean --x -d```

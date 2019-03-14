# clean-ue4
Simple npm script to clean Intermediate, Saved folders, and .pdbs from unreal projects and plugins for release preparation.

## Setup
1. Install [nodejs](https://nodejs.org/en/download/)
2. Navigate to ue4 project of choice and open a powershell window there

### via npm
3. ```npm i clean-ue4```
4. ```cd node_modules```
5. ```node clean-ue4``` this will give you usage instructions

### via git
3. ```git clone https://github.com/getnamo/clean-ue4.git```
4. ```cd clean-ue4```
5. ```npm i```
6. ```node clean-ue4``` this will give you usage instructions


## Usage

Format is

```node clean-ue4 --p <path>``` where path should only be ```auto``` unless you use ```-u```, then path can be anything.

You'll need one of the following options

#### Options
```-i``` for intermediate folders
```-s``` for saved folder
```-b``` for *.pdb files

e.g. for everything

```node clean-ue4 --p ../ -i -s -b```

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
```node clean-ue4 -x```

I would recommend doing a dry run first...

```node clean-ue4 --x -d```

#### Very lazy mode
Click on the _FullCleanForRelease.bat_.

#sips -s format jpeg ./*.png --out jpg
#cd jpg/
#/Applications/ImageOptim.app/Contents/MacOS/ImageOptim *.jpg
#convert -delay 0 -loop 0 *.jpg ./animated.gif

# http://www.reddit.com/r/reactiongifs/comments/x55z9/after_i_learned_how_to_make_large_well_compressed/
#convert -crop '1000x500+176+40' +repage -fuzz 1.6% -delay 8 -loop 0 *.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif

# This will create a run and create the
# documentation for the run in one command
# after a run this will take all the created
# images and make a gif of them
# then it will also take the output from the comand
# and inject it into a markdown file
# the run is named after running count in
# the documenting folder

#foreman run node index.js 3> ./temp.txt

DEBUG_FD=3 DEBUG=* MONGO_URL=mongodb://localhost:27017/image node index.js 3> ./temp.txt
cd ./images-generated
sips -Z 700 *.png && convert -fuzz 1.6% -loop 0 *.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif && gifsicle -O3 --colors 256 Almost.gif > Done.gif
cd ../documenting
RUN_NUM=$(ls | sort | tail -n 1 | tr -dc '[0-9]')
RUN_NUM=$((10#$RUN_NUM+1))
mv "../images-generated/Done.gif" "./run"$RUN_NUM".gif"
(echo '![run'$RUN_NUM'](./run'$RUN_NUM'.gif)' && echo && echo "\`\`\`" && cat ../temp.txt && echo "\`\`\`") > 'run'$RUN_NUM'.md'
cd ..
rm -rf ./images-generated
mkdir ./images-generated

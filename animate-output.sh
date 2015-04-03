#sips -s format jpeg ./*.png --out jpg
#cd jpg/
#/Applications/ImageOptim.app/Contents/MacOS/ImageOptim *.jpg
#convert -delay 0 -loop 0 *.jpg ./animated.gif

# http://www.reddit.com/r/reactiongifs/comments/x55z9/after_i_learned_how_to_make_large_well_compressed/
#convert -crop '1000x500+176+40' +repage -fuzz 1.6% -delay 8 -loop 0 *.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif

#foreman run node index.js > ./documenting/temp.txt
cat ./temp.txt > ./documenting/temp.txt
cd ../images-generated
sips -Z 700 *.png && convert -fuzz 1.6% -loop 0 *.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif && gifsicle -O3 --colors 256 Almost.gif > Done.gif
cd ../documenting
RUN_NUM=$(ls | sort | tail -n 1 | tr -dc '[0-9]')
mv "../images-generated/Done.gif" "./run"$RUN_NUM".gif"
(echo '![run'$RUN_NUM'](./run'$RUN_NUM'.gif)' && echo && echo "\`\`\`" && cat temp.txt && echo "\`\`\`") > 'run'$RUN_NUM'.md'

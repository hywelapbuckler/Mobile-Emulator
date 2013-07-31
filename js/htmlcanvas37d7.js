/* ---------------------------------- */

/* htmll5 */

(function($) {

   $.html5 = {};
   
   var $self = $.html5;
   
   $.html5.canvas = {
   
    /* ---------------------------------- */
    /* create */
  
    create: function(id,container) {

      var $canvas;
      
      if ($.browser.msie) {

         
         $canvas = $('canvas')
      }else{

        $canvas = $('<canvas/>');
        $canvas.appendTo(container);
        
      }
      
    
      $canvas.attr({id:id}).css({position: 'absolute',left:0,top:0})
      return $canvas;
        

        
      
    }
    
    ,
    
    /* ---------------------------------- */
    /* draw */
    /*
    
    public methods:
    draw.line()
    draw.filledPolygon()
    draw.arrowhead()
    draw.rect()
    
    utils:
    translateShape
    rotateShape
    rotatePoint
        
    
    */
     
    draw: {
  
     
     /* ---------------------------------- */
     /* line */
     dashedline:
     
      function(ctx,x1, y1, x2, y2, c,dashLen) {
      
        if (dashLen == undefined) dashLen = 6;
            
            ctx.strokeStyle = "#4f9426";//'#999999'//'#00fb3c';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            var dX = x2 - x1;
            var dY = y2 - y1;
            var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
            
            //IE 8.0.6 BUG: needs odd number of dashes:
            if (dashes%2==0) dashes++;
            var dashX = dX / dashes;
            var dashY = dY / dashes;
            var q = 0;
            while (q++ < dashes) {
             x1 += dashX;
             y1 += dashY;
             ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
            }
            ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
            ctx.stroke();
        

      }
      
     ,
     
     line: 
            
            function(ctx,x1,y1,x2,y2,c) { 
        
            /*
            var linePattern;
            var imageToUsedAsPattern = new Image();
            imageToUsedAsPattern.src = "https://dl.dropboxusercontent.com/u/47807983/wavetele.com/images/pattern_line.png";   
            linePattern = ctx.createPattern(imageToUsedAsPattern, "repeat");
            ctx.strokeStyle=linePattern;
            */
            ctx.strokeStyle = '#4f9426';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
            
            } //line
            
     ,
      
      
     /* ---------------------------------- */
     /* filledPoly */
     
     filledPolygon: 
      
            function(ctx,shape,c) {
        
            ctx.beginPath();
            ctx.fillStyle = '#c5ffc8';
            ctx.moveTo(shape[0][0],shape[0][1]);

            for(p in shape)
              if (p > 0) ctx.lineTo(shape[p][0],shape[p][1]);

            ctx.lineTo(shape[0][0],shape[0][1]);
            ctx.fill();
            
            } //filledPoly

     ,
    
     /* ---------------------------------- */
     /* arrowhead */
          
     arrowhead: 
      
            function(ctx,x1,y1,x2,y2,c) {
            
            var ang = Math.atan2(y2-y1,x2-x1);
            var arrow = [
                [ 2, 0 ],
                [ -10, -4 ],
                [ -10, 4]
            ];
            
            
            $self.canvas.draw.filledPolygon(
              ctx,
              $self.canvas.draw.utils.translateShape(
                $self.canvas.draw.utils.rotateShape(arrow,ang),
                x2,
                y2),
              c);
            
            
        
            } //arrowhead
     ,
    
     /* ---------------------------------- */
     /* rect */
    
     rect: function(ctx,text, _x, _y, _w, _h) {            

            ctx.strokeStyle = HIGHLIGHT;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(_x, _y, _w, _h);
            ctx.save();


            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "black";    
            ctx.closePath();
            ctx.fillText(text, _x+(w/2)-10, _y+(h/2)+5);
            ctx.stroke();

            ctx.restore();
            } //rect    
      
      ,
      
      /* ---------------------------------- */
      /* utilities */
      
      utils: {


        translateShape: function(shape,x,y) {
          var rv = [];
          for(p in shape)
            rv.push([ shape[p][0] + x, shape[p][1] + y ]);
          return rv;
        } //translateShape
        
        ,

        rotateShape: function(shape,ang) {
          var rv = [];
          for(p in shape)
            rv.push($self.canvas.draw.utils.rotatePoint(ang,shape[p][0],shape[p][1]));
          return rv;
        } //rotateShape
        
        ,

        rotatePoint: function(ang,x,y) {
          return [
            (x * Math.cos(ang)) - (y * Math.sin(ang)),
            (x * Math.sin(ang)) + (y * Math.cos(ang))
        ];
        
        } //rotatePoint
    
      
      } //utilities
    

    }//draw
   
   
   }//html5.canvas

  
   
})(jQuery);
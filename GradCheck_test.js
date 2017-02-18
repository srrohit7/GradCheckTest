	var catscope={};
    
    function writeOut(formid,value){
		var formid_handle= $(formid)
  		formid_handle.val(math.format(value,{notation:'auto',  precision: 3}));
	};// Why is there no return?
    
    String.prototype.toNum = function(){
        return parseFloat(this);
        }
        
    function replaceNaN(array){
        $.each( array, function( index, value){
           if(isNaN(value)){
            array[index]= 0;
           } 
        
        });
        return array
    }
    
    $(document).ready(function(){
    	$("#no_of_reactants").on('keyup keydown change click',function(){
    		if($("#no_of_reactants").val() == "Two"){
    			$("#hide_res_dens_C, #hide_res_mw_C, #name_reactant_C").hide("fast");
    	    }
    	    else if($("#no_of_reactants").val() == "Three"){
    	        $("#hide_res_dens_C, #hide_res_mw_C, #name_reactant_C").show("fast");
    	    }
    	});
    });
    
    $(document).ready(function(){
            $("#dialog_1").dialog({
                autoOpen: false,
            });
            $("#button_test").on('click',function(){
               $("#dialog_1").dialog("open"); 
            });
    });
    
    $(document).ready(function(){
        var $input = $('form.insec').find('input');//function to put names to ids for use in making json files
        var $dropdowns=$('form.insec').find('select');
        
        $input.each(function(){
            this.name=this.id;
        });
        
        $dropdowns.each(function(){
            this.name=this.id;
        });
        
    });
    
    
    
    $(document).ready(function(){
        $("#calculate_inputs").on('click', function(){
            var inputs = $('form.insec').serializeArray();
            var string= JSON.stringify(inputs, null, '\t');
            var filename= $("#JSON_filename").val();
            var suffix= ".json"
            var output=document.querySelector("a#calculate_inputs"); // it gives out the element?? why can't we use it directly??
            
             output.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(string); //didn't understand
             output.download= filename+suffix;
            
        });
    });
        
    $(document).ready(function(){
        $("#temp").on('keyup keydown change click',function(){
    		var cel= $(this).val()-273;
    		
            writeOut("#celcius",cel);
      		//$("#celcius").val(cel);
    	});
        
        $(document).ready(function(){
    		$("#initialize").trigger("change");
  		});
        
        $("#button_test").on('change click',function(){
  			var densityA=$("#res_dens_A").val().toNum();
    		var densityB=$("#res_dens_B").val().toNum();
            var densityC=$("#res_dens_C").val().toNum();
            
            var mwA=$("#mw_A").val().toNum();
    		var mwB=$("#mw_B").val().toNum();
            var mwC=$("#mw_C").val().toNum();
            
    
    		catscope.densityA= densityA;
    		catscope.densityB= densityB;
            
            var dens_Array=[densityA, densityB,densityC];
            dens_Array=replaceNaN(dens_Array);
            
            catscope.dens_Array=dens_Array;
            
            
            var dens_Array_slice=dens_Array.slice(0,-1)
            catscope.dens_Array_slice=dens_Array_slice;
            
            var MW_Array=[mwA,mwB,mwC];
            MW_Array=replaceNaN(MW_Array);
            catscope.MW_Array=MW_Array;
            
            var MW_Array_slice=MW_Array.slice(0,-1);
            catscope.MW_Array_slice=MW_Array_slice;
            
        });
        
        $("#button_test").on('keyup keydown change click',function(){
  		//peace=numeric.add(400+300);
  		//var densityA=$("#res_dens_A").val();
  		//catscope.densityA= densityA; 
  
  		//var peace=math.eval("densityA + densityB",catscope);
  		 var peace=math.eval('dens_Array*transpose(MW_Array)',catscope);
        $("#overall_dens").val(peace);
         
        
        });
    
  
    });
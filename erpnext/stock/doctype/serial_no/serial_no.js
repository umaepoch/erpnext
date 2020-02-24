// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

cur_frm.add_fetch("customer", "customer_name", "customer_name")
cur_frm.add_fetch("supplier", "supplier_name", "supplier_name")

cur_frm.add_fetch("item_code", "item_name", "item_name")
cur_frm.add_fetch("item_code", "description", "description")
cur_frm.add_fetch("item_code", "item_group", "item_group")
cur_frm.add_fetch("item_code", "brand", "brand")

cur_frm.cscript.onload = function() {
	cur_frm.set_query("item_code", function() {
		return erpnext.queries.item({"is_stock_item": 1, "has_serial_no": 1})
	});
};

frappe.ui.form.on("Serial No", "refresh", function(frm) {
	frm.toggle_enable("item_code", frm.doc.__islocal);
});


//links and revision
frappe.ui.form.on("Serial No", "refresh", function(frm, cdt, cdn) {
    console.log("Entered------");
    var d = locals[cdt][cdn];
    var attached_to_name = d.name;
    console.log("attached_to_name", attached_to_name);
    var attached_to_doctype = d.doctype;
    console.log("attached_to_doctype", attached_to_doctype);
    var created_combined_pdf = d.created_combined_pdf;
    console.log("created_combined_pdf", created_combined_pdf);

    var file_url_pressure_test = fetch_file_url_pressure(attached_to_name);
    console.log("file_url_pressure_test", file_url_pressure_test);
    var file_link1 = "<a href= " + file_url_pressure_test[0]['File_url'] + " target = _blank>" + file_url_pressure_test[0]['File_url'] + "<br/>" + "</a>"

    console.log("file_link1", file_link1);
    cur_frm.set_value("pch1_pressure_test", file_link1.toString())
    frm.refresh_field("pch1_pressure_test")

    var file_url_coc = fetch_file_url_coc(attached_to_name);
    console.log("file_url_coc", file_url_coc);
    var file_link2 = "<a href= " + file_url_coc[0]['File_url'] + " target = _blank>" + file_url_coc[0]['File_url'] + "<br/>" + "</a>"
    cur_frm.set_value("pch1_coc", file_link2.toString())
    frm.refresh_field("pch1_coc")


    var file_url_build_sheet = fetch_file_url_build_sheet(attached_to_name);
    console.log("file_url_build_sheet", file_url_build_sheet);
    var file_link3 = "<a href= " + file_url_build_sheet[0]['File_url'] + " target = _blank>" + file_url_build_sheet[0]['File_url'] + "<br/>" + "</a>"
    cur_frm.set_value("pch1_build_sheet", file_link3.toString())
    frm.refresh_field("pch1_build_sheet")

    var file_url_user_manual = fetch_file_user_manual(attached_to_name);
    console.log("file_url_user_manual", file_url_user_manual);
    var file_link5 = "<a href= " + file_url_user_manual[0]['File_url'] + " target = _blank>" + file_url_user_manual[0]['File_url'] + "<br/>" + "</a>"

    console.log("file_link5", file_link5);
    cur_frm.set_value("pch1_user_manual", file_link5.toString())
    frm.refresh_field("pch1_user_manual")

 if (created_combined_pdf!=1){
 console.log("entered in if block");
    var merger_pdf = fetch_file_link(cur_frm.doc.name,attached_to_name);
console.log("merged_pdf............",merger_pdf);
   
    var combined_file_url = fetch_combined_file(attached_to_name,attached_to_doctype);
    console.log("combined_file_url", combined_file_url);
    var file_link4 = "<a href= " + combined_file_url[0]['File_url'] + " target = _blank>" + combined_file_url[0]['File_url'] + "<br/>" + "</a>"
    cur_frm.set_value("pch1_combined_", file_link4.toString())
    frm.refresh_field("pch1_combined_")


   }

    /*var combined_file_url = fetch_combined_file(attached_to_name);
    console.log("file_url_build_sheet", file_url_build_sheet);
    var file_link4 = "<a href= " + combined_file_url[0]['File_url'] + " target = _blank>" + combined_file_url[0]['File_url'] + "<br/>" + "</a>"
    cur_frm.set_value("pch1_combined_", file_link4.toString())
    frm.refresh_field("pch1_combined_")*/


});


function fetch_file_url_pressure(attached_to_name) {
    console.log("entered into fetch_file_url_pressure function");
    var pressure_test = "";
    frappe.call({
        method: "nhance.api.get_file_url_pressure",
        args: {
            "attached_to_name": attached_to_name
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                pressure_test = r.message;
                console.log("checking--------------" + pressure_test);
                console.log("readings-----------" + JSON.stringify(r.message));


            }
        }

    });
    console.log("pressure_test", pressure_test);
    return pressure_test
}

function fetch_file_url_coc( attached_to_name) {
    console.log("entered into fetch_file_url_coc function");
    var coc = "";
    frappe.call({
        method: "nhance.api.get_file_url_coc",
        args: {
            "attached_to_name": attached_to_name
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                coc = r.message;
                console.log("checking--------------" + coc);
                console.log("readings-----------" + JSON.stringify(r.message));


            }
        }

    });
    console.log("coc", coc);
    return coc
}


function fetch_file_url_build_sheet(attached_to_name) {
    console.log("entered into fetch_file_url_build_sheet function");
    var build_sheet = "";
    frappe.call({
        method: "nhance.api.get_file_url_build_sheet",
        args: {
            "attached_to_name": attached_to_name
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                build_sheet = r.message;
                console.log("checking--------------" + build_sheet);
                console.log("readings-----------" + JSON.stringify(r.message));


            }
        }

    });
    console.log("build_sheet", build_sheet);
    return build_sheet
}

function fetch_file_link(name,attached_to_name){
    console.log("entered into get_merge_file_url function");
    var file_url_list = "";
    frappe.call({
        method: "nhance.api.get_merge_file_url",
        args: {
            "name":name,
            "attached_to_name":attached_to_name
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                file_url_list = r.message;
                console.log("checking--------------" + file_url_list);
                console.log("readings-----------" + JSON.stringify(r.message));
               for (var i = 0; i < file_url_list.length; i++) {
                    console.log("Name:" + file_url_list[i]);
                   
                }

            }
        }

   });
    console.log("file_url_list.............", file_url_list);
    return file_url_list
}



function fetch_combined_file(attached_to_name,attached_to_doctype) {
    console.log("entered into fetch_combined_file function");
    var combined = "";
    frappe.call({
        method: "nhance.api.get_combined_pdf",
        args: {
            "attached_to_name":attached_to_name,
            "attached_to_doctype": attached_to_doctype
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                combined = r.message;
                console.log("checking--------------" + combined);
                console.log("readings-----------" + JSON.stringify(r.message));


            }
        }

    });
    console.log("combined", combined);
    return combined
}

function fetch_file_user_manual(attached_to_name) {
    console.log("entered into fetch_file_user_manual function");
    var manual_pdf = "";
    frappe.call({
        method: "nhance.api.get_file_url_user_manual",
        args: {
            "attached_to_name": attached_to_name
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                manual_pdf = r.message;
                console.log("checking--------------" + manual_pdf);
                console.log("readings-----------" + JSON.stringify(r.message));


            }
        }

    });
    console.log("manual_pdf", manual_pdf);
    return manual_pdf
}

frappe.ui.form.on("Serial No", "refresh", function(frm, cdt, cdn) {
 
 var d = locals[cdt][cdn];
    var item_code = d.item_code;
    console.log("item_code", item_code);


var purchase_document_no=d.purchase_document_no;
console.log("purchase_document_no", purchase_document_no);
var purchase_document_type=d.purchase_document_type;
console.log("purchase_document_type", purchase_document_type);

if(purchase_document_type=="Stock Entry"){
console.log("entered in stock block");
var revision=fetch_stock_entry_revision_number(item_code,purchase_document_no);
console.log("revision",revision[0].revision_number);
}

else
{
console.log("entered in purchase receipt block");
var revision=fetch_revision_number(item_code,purchase_document_no);
console.log("revision",revision[0].revision_number);
}
var RevisionNumber=revision[0].revision_number;
cur_frm.set_value("revision_number",RevisionNumber)
    frm.refresh_field("revision_number")

});
function fetch_revision_number(item_code,purchase_document_no){
    console.log("entered into fetch_revision_number function");
    var revision_list = "";
    frappe.call({
        method: "nhance.api.get_purchse_receipt_revision_no",
        args: {
            
            "item_code":item_code,
            "purchase_document_no":purchase_document_no
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                revision_list = r.message;
                console.log("checking--------------" + revision_list[0].revision_number);
                console.log("readings-----------" + JSON.stringify(r.message));
               

            }
        }

   });
    console.log("revision_list", revision_list);
    return revision_list
}
function fetch_stock_entry_revision_number(item_code,purchase_document_no){
    console.log("entered into fetch_stock_entry_revision_number function");
    var stock_entry_revision_no = "";
    frappe.call({
        method: "nhance.api.get_stock_entry_revision_no",
        args: {
            
            "item_code":item_code,
            "purchase_document_no":purchase_document_no
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                stock_entry_revision_no = r.message;
                console.log("checking--------------" + stock_entry_revision_no[0].revision_number);
                console.log("readings-----------" + JSON.stringify(r.message));
               

            }
        }

   });
    console.log("stock_entry_revision_no", stock_entry_revision_no);
    return stock_entry_revision_no
}

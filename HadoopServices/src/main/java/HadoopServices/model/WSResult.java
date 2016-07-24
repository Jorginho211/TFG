/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package HadoopServices.model;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 *
 * @author berfenger
 */
public class WSResult {
    public boolean success = false;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Object content = null;

    public WSResult(boolean success) {
        this.success = success;
    }

    public WSResult(boolean success, Object content) {
        this.success = success;
        this.content = content;
    }
}

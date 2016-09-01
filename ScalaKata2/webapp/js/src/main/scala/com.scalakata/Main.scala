package com.scalakata

import autowire._
import org.denigma.codemirror._
import org.scalajs.dom
import org.scalajs.dom.navigator
import org.scalajs.dom.raw.{HTMLTextAreaElement, HTMLElement, Node}
import org.scalajs.dom.ext.Ajax
import scalajs.concurrent.JSExecutionContext.Implicits.queue
import scalajs.js
import scalajs.js.annotation.JSExport
import scalatags.JsDom.all._
import scala.util.{Success, Failure}


@JSExport
object Main {
  @JSExport
  def main(): Unit = {
    val isMac = navigator.userAgent.contains("Mac")

    dom.document.body.className =
      if (isMac) "mac"
      else "pc"

    val ctrl = if(isMac) "Cmd" else "Ctrl"
    val ctrlS = if(isMac) "⌘" else "Ctrl"

    val params = EditorConfig.
      mode(Rendering.modeScala).
      autofocus(true).
      lineNumbers(false).
      lineWrapping(false).
      tabSize(2).
      indentWithTabs(false).
      theme("solarized dark").
      smartIndent(true).
      keyMap("sublime").
      scrollPastEnd(true).
      scrollbarStyle("simple").
      extraKeys(js.Dictionary(
        "Tab"          -> "specialTab",
        s"$ctrl-l"     -> null,
        s"$ctrl-Space" -> "autocomplete",
         "."           -> "autocompleteDot",
        s"$ctrl-."     -> "typeAt",
        s"$ctrl-Enter" -> "run",
        // s"$ctrl-,"     -> "config", // TODO: edit configs
        "F1"           -> "help",
        "F2"           -> "solarizedToggle",
        "F7"           -> "share"
      )).
      autoCloseBrackets(true).
      matchBrackets(true).
      showCursorWhenSelecting(true).
      autofocus(true).
      highlightSelectionMatches(js.Dictionary(
        "showToken" -> js.Dynamic.global.RegExp("\\w")
      ))

    val themeButton = dom.document.getElementById("theme")
    val stateButton = dom.document.getElementById("state")
    val shareButton = dom.document.getElementById("share")    

    CodeMirror.commands.run = Rendering.run _
    CodeMirror.commands.typeAt = Hint.typeAt _
    CodeMirror.commands.autocomplete = Hint.autocomplete _
    CodeMirror.commands.autocompleteDot = Hint.autocompleteDot _
    CodeMirror.commands.help = (editor: Editor) ⇒ {
      editor.getDoc().setValue(Util.wrap("help"))
      Rendering.run(editor)
    }
    CodeMirror.commands.specialTab = (editor: Editor) ⇒ {
      if (editor.somethingSelected()) editor.indentSelection("add");
      else editor.execCommand("insertSoftTab");
    }
    CodeMirror.commands.solarizedToggle = (editor: Editor) ⇒ {
      val isDark = editor.getOption("theme").asInstanceOf[String] == "solarized dark"
      val theme =
        if(isDark) "solarized light"
        else "solarized dark"

      val icon =
        if(isDark) "moon"
        else "sun"
      themeButton.setAttribute("data-glyph", icon)
      editor.setOption("theme", theme)
    }
    CodeMirror.commands.share = (editor: Editor) ⇒ {
      GitHub.share(editor.getDoc().getValue())
        .recover { case t ⇒ s"Failed to share your code: ${t.getMessage}" }
        .foreach { gistId ⇒
          val sharedDiv = dom.document.getElementById("shared")
          sharedDiv.setAttribute("style", "display: block")

          val scalaKataLink = s"${dom.window.location}gist/$gistId"
          val gitHubLink = s"https://gist.github.com/anonymous/$gistId"

          val close = i(`class` := "oi", "data-glyph".attr := "circle-x").render

          close.addEventListener("click", (e: dom.Event) ⇒ 
            sharedDiv.setAttribute("style", "display: none")            
          )

          while (sharedDiv.firstChild != null) {
            sharedDiv.removeChild(sharedDiv.firstChild)
          }
          sharedDiv.appendChild(div(
            "Shared as:", a(href := scalaKataLink, target := "_blank")(scalaKataLink),
            "(", a(href := gitHubLink, target := "_blank")("GitHub"), ")",
            close            
          ).render)
        }
    }

    dom.document.getElementById("scalakata") match {
      case el:HTMLTextAreaElement ⇒ {
        val editor = CodeMirror.fromTextArea(el, params)
        val doc = editor.getDoc()
        editor.focus()
        Rendering.resetCursor(doc)
        themeButton.addEventListener("click", (e: dom.Event) ⇒ CodeMirror.commands.solarizedToggle(editor))
        shareButton.addEventListener("click", (e: dom.Event) ⇒ CodeMirror.commands.share(editor))


        //---------------------------------------------Modificaciones------------------------------------------
        dom.window.addEventListener("message", (evt: dom.MessageEvent ) => {
          if(evt.origin == "http://localhost:3000"){
            if(evt.data.toString == "requestData"){
              dom.console.log("Scalakata: RequestData")
              dom.top.postMessage(doc.getValue(), "http://localhost:3000")
            }
            else if(evt.data.toString == "removeData"){
              dom.console.log("Scalakata: RemoveData")
              doc.setValue("")
              dom.top.postMessage("removeOK", "http://localhost:3000")
            }
            else {
              var operationData = evt.data.toString.split("/;/");

              if(operationData(0).toString == "code"){
                dom.console.log("Scalakata: SaveData")
                doc.setValue(operationData(1).toString)
                dom.top.postMessage("saveOK", "http://localhost:3000") 
              }
              else if(operationData(0).toString == "property"){
                dom.console.log("Add property to code: " + operationData(1).toString)

                doc.replaceRange(operationData(1).toString, doc.getCursor())
              }           
            }
          }
        })
        //----------------------------------------------------------------------------------------------

        dom.document.getElementById("help").addEventListener("click", (e: dom.Event) ⇒ CodeMirror.commands.help(editor))
        stateButton.setAttribute("title", s"run ($ctrlS + Enter)")
        stateButton.addEventListener("click", (e: dom.Event) ⇒ {
          if(Rendering.toclear) {
            Rendering.clear(doc)
            Rendering.toclear = false
          } else {
            Rendering.run(editor)
          }
        })

        val path = dom.location.pathname
        if(path != "/") {
          if(path.startsWith("/room/")) {
            Collaborative(editor)
          } else if(path.startsWith("/gist/")) {
            val gistId = dom.location.pathname.drop("/gist/".length)
            GitHub.fetch(gistId)
              .recover { case _ ⇒ Util.wrap(s"// Failed to load gist") }
              .foreach { content ⇒
                doc.setValue(content)
                Rendering.run(editor)
              }
          } else {
            Ajax.get(s"/assets/$path").onSuccess{ case xhr ⇒
              doc.setValue(xhr.responseText)
              Rendering.run(editor)
            }
          }
        } else {
          val storage = dom.localStorage.getItem(Rendering.localStorageKey)
          if(storage != null) {
            doc.setValue(storage)
            Rendering.run(editor)
          }
          else {
            //CodeMirror.commands.help(editor)

            doc.setValue("import com.twitter.scalding._\r\nimport java.io.File\r\nimport com.github.nscala_time.time.Imports._\r\nimport com.mongodb.{BasicDBObject}\r\nimport cascading.tuple.{Fields, TupleEntry}\r\nimport cascading.pipe.joiner._\r\nimport cascading.pipe._\r\nimport scala.collection.JavaConversions._\r\nimport es.usc.citius.scalding2mongo._\r\n\r\nclass KPI {\r\n  (args: Args) => {\r\n    new Job(args) {\r\n    \t\r\n    }\r\n  }\r\n}")
            Rendering.run(editor)
            ()
          }
        }
      }
      case _ ⇒ dom.console.error("cannot find text area for the code!")
    }
  }
}

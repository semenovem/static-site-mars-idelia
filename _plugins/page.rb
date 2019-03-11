module Jekyll
  class AddVarToPage < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      page = context.registers[:page]

      return "asd"

# todo не готово
      if @markup.empty?
        return "Error processing input, expected syntax: {% addVarToPage name variable value %}"
      end

      res = @markup.split('=')

      unless page[res[0]]
        page[res[0]] = []
      end

      unless page[variable_name] == Array
        page[variable_name] = [page[variable_name]]
      end

      page[res[0]].unshift(res[1])
      return nil
    end
  end
end

Liquid::Template.register_tag('addVarToPage', Jekyll::AddVarToPage)


module Jekyll
  module AssetFilter
    def addVarToPage(value, variable_name)
      page = @context.registers[:page]

     # unless page[variable_name]
     #   page[variable_name] = []
     # end

     # unless page[variable_name].class == Array
     #   tmp = page[variable_name]
     #   page[variable_name] = [tmp]
     # end

     # page[variable_name].unshift(value)

     # return value
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)

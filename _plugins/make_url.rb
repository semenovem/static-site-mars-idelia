module Jekyll
  module MakeUrl
    def makeUrl(r)
      resource = trim(r)
      resource = format(resource)

      if resource[0] == "/"
          return resource[1..1000]
      end

      return resource

      unless resource[0] == "/"
        return format("./" + resource)
      end

      page = @context.registers[:page]
      if page['url'].include? "404"
        return format("/" + resource)
      end

      up = def_len_path(page['url'])

      format((up == 0 ? './' : '../' * up) + resource)
    end


    private

    def def_len_path(path)
      path.scan(/\//).size - 1
    end

    def trim(s)
      s.gsub(/^\s+/, '').gsub(/\s+$/, '')
    end

    def format(s)
      s.gsub(/\/{2,}/, "/")
    end
  end
end

Liquid::Template.register_filter(Jekyll::MakeUrl)

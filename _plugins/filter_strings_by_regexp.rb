module Jekyll
  module FilterStringsByRegexp
    def filter_strings_by_regexp(list, regexp)
      reg = Regexp.new regexp

      list.select { |item| item =~ reg }
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterStringsByRegexp)
